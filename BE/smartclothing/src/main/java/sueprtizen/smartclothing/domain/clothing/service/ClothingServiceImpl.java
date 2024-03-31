package sueprtizen.smartclothing.domain.clothing.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;
import sueprtizen.smartclothing.domain.clothing.dto.*;
import sueprtizen.smartclothing.domain.clothing.entity.*;
import sueprtizen.smartclothing.domain.clothing.exception.ClothingErrorCode;
import sueprtizen.smartclothing.domain.clothing.exception.ClothingException;
import sueprtizen.smartclothing.domain.clothing.repository.*;
import sueprtizen.smartclothing.domain.users.entity.User;
import sueprtizen.smartclothing.domain.users.exception.UserErrorCode;
import sueprtizen.smartclothing.domain.users.exception.UserException;
import sueprtizen.smartclothing.domain.users.repository.UserRepository;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ClothingServiceImpl implements ClothingService {


    private final UserRepository userRepository;
    private final UserClothingRepository userClothingRepository;
    private final ClothingRepository clothingRepository;
    private final ClothingStyleRepository clothingStyleRepository;
    private final StyleRepository styleRepository;
    private final ClothingSeasonRepository clothingSeasonRepository;
    private final ClothingDetailRepository clothingDetailRepository;

    @Override
    public List<ClosetConfirmResponseDTO> closetConfirmation(int userId) {

        User currentUser = getUser(userId);

        List<UserClothing> allClothing = userClothingRepository.findAllByUser(currentUser);

        return allClothing.stream().map(
                ClosetConfirmResponseDTO::createFromUserClothing
        ).toList();
    }

    @Override
    public ClothingConfirmResponseDTO clothingConfirmation(int userId, int clothingId) {

        User currentUser = getUser(userId);

        Clothing clothing = clothingRepository.findById(clothingId)
                .orElseThrow(() -> new ClothingException(ClothingErrorCode.CLOTHING_NOT_FOUND));

        UserClothing userClothing = userClothingRepository.findUserClothingByClothing(currentUser, clothing)
                .orElseThrow(() -> new ClothingException(ClothingErrorCode.CLOTHING_NOT_FOUND));

        List<SharedUserDTO> sharedUserDTOList = clothing.getUserClothing().stream()
                .filter(uc -> uc.getUser().getUserId() != currentUser.getUserId())
                .map(uc -> new SharedUserDTO(uc.getUser()))
                .toList();

        boolean isMyClothing = currentUser.getUserId() == clothing.getOwnerId();

        return new ClothingConfirmResponseDTO(clothing, userClothing, sharedUserDTOList, isMyClothing);
    }

    @Override
    public void removeClothing(int userId, int clothingId) {
        User currentUser = getUser(userId);

        Clothing clothing = clothingRepository.findById(clothingId)
                .orElseThrow(() -> new ClothingException(ClothingErrorCode.CLOTHING_NOT_FOUND));

        UserClothing userClothing = userClothingRepository.findUserClothingByClothing(currentUser, clothing)
                .orElseThrow(() -> new ClothingException(ClothingErrorCode.CLOTHING_NOT_FOUND));

        userClothingRepository.delete(userClothing);
    }

    @Override
    @Transactional
    public void updateClothing(int userId, ClothingUpdateRequestDTO clothingUpdateRequestDTO) {
        User currentUser = getUser(userId);


        Clothing clothing = clothingRepository.findById(clothingUpdateRequestDTO.clothingId())
                .orElseThrow(() -> new ClothingException(ClothingErrorCode.CLOTHING_NOT_FOUND));

        UserClothing userClothing = userClothingRepository.findUserClothingByClothing(currentUser, clothing)
                .orElseThrow(() -> new ClothingException(ClothingErrorCode.CLOTHING_NOT_FOUND));


        // 스타일 모두 삭제
        clothingStyleRepository.deleteAllByClothing(clothing);

        List<Style> newStyleList = styleRepository.findAllByStyleNameIn(clothingUpdateRequestDTO.styles())
                .orElseThrow(() -> new ClothingException(ClothingErrorCode.STYLE_NOT_FOUND));

        List<ClothingStyle> newClothingStyleList = newStyleList.stream().map(style ->
                ClothingStyle.builder()
                        .clothing(clothing)
                        .style(style)
                        .build()
        ).toList();


        //새로운 스타일 연결
        clothingStyleRepository.saveAll(newClothingStyleList);


        // 계절 모두 삭제
        clothingSeasonRepository.deleteAllByUserClothing(userClothing);

        List<ClothingSeason> newSeasonList = clothingUpdateRequestDTO.seasons().stream().map(month ->
                ClothingSeason.builder()
                        .userClothing(userClothing)
                        .month(month)
                        .build()
        ).toList();

        //새로운 계절 연결
        clothingSeasonRepository.saveAll(newSeasonList);


        // 옷 주인인 경우만 공유 사용자 변경
        if (clothing.getOwnerId() == currentUser.getUserId()) {
            //기존 옷 사용자 연결
            Set<Integer> userClothingSet = userClothingRepository.findSharedUsersByClothingIdAndUserId(
                    currentUser.getUserId(), clothing.getClothingId()
            );

            //새로운 옷 사용자 연결
            Set<Integer> sharedUserIdSet = clothingUpdateRequestDTO.sharedUserIds().stream()
                    .filter(id -> id != currentUser.getUserId())
                    .collect(Collectors.toSet());

            sharedUserIdSet.forEach(sharedUserId -> {
                if (!userClothingSet.contains(sharedUserId)) {
                    UserClothing newUserClothing = UserClothing.builder()
                            .clothing(clothing)
                            .clothingName(clothingUpdateRequestDTO.clothingName())
                            .user(getUser(sharedUserId))
                            .build();
                    userClothingRepository.save(newUserClothing);
                }
            });

            clothing.getUserClothing().forEach(uc -> {
                if (uc.getUser().getUserId() != clothing.getOwnerId() && !sharedUserIdSet.contains(uc.getUser().getUserId())) {
                    userClothingRepository.delete(uc);
                }
            });
        }

        //옷 정보 업데이트
        clothing.updateClothing(newClothingStyleList, clothingUpdateRequestDTO.category());

        //사용자 옷 연결 업데이트
        userClothing.updateUserClothing(clothingUpdateRequestDTO.clothingName(), clothing, newSeasonList);

    }

    @Override
    public List<ClothingPositionResponseDTO> getClothingPosition(int userId) {
        User currentUser = getUser(userId);
        List<UserClothing> userClothing = userClothingRepository.findAllByUser(currentUser);
        return userClothing.stream().filter(uc ->
                !uc.getClothing().getNowAt().equals("옷장")
        ).map(uc ->
                {
                    Clothing clothing = uc.getClothing();
                    return new ClothingPositionResponseDTO(
                            clothing.getClothingId(),
                            clothing.getNowAt(),
                            uc.getClothingName(),
                            clothing.getLocationModifiedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")),
                            clothing.getClothingDetail().getClothingImgPath()
                    );
                }
        ).toList();
    }

    public JSONObject getClothingInfo(String rfidUid) {
        Clothing clothing = clothingRepository.findByRfidUid(rfidUid);
        ClothingDetail detail = clothingDetailRepository.findByClothingDetailId(clothing.getClothingDetail().getClothingDetailId());

        JSONObject jsonObject = new JSONObject();
        List<ClothingTexture> texture = detail.getClothingTextures();
        jsonObject.put("texture", texture.get(0).getTexture().getTextureName());
        jsonObject.put("image", detail.getClothingImgPath());
        jsonObject.put("category", clothing.getCategory());

        return jsonObject;
    }

    public JSONObject getClothingImage(String rfid) {
        Integer detailId = clothingRepository.findByRfidUid(rfid).getClothingDetail().getClothingDetailId();
        ClothingDetail detail = clothingDetailRepository.findByClothingDetailId(detailId);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("image", detail.getClothingImgPath());

        return jsonObject;
    }

    public void addClothes(String rfid, JSONArray users, Long detailId) {
        ClothingDetail detail = clothingDetailRepository.findByClothingDetailId(detailId.intValue());
        new Clothing();
        Clothing newClothing = Clothing.builder()
                .rfidUid(rfid)
                .detail(detail)
                .build();
        clothingRepository.save(newClothing);
        for (Object user : users) {
            User newUser = getUser(Integer.valueOf(String.valueOf(user)));
            UserClothing uc = new UserClothing(newUser, newClothing);
            userClothingRepository.save(uc);
        }
    }


    private User getUser(int userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new UserException(UserErrorCode.NOT_FOUND_MEMBER));
    }

}
