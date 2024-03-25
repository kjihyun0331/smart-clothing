package sueprtizen.smartclothing.domain.clothing.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sueprtizen.smartclothing.domain.clothing.dto.ClosetConfirmResponseDTO;
import sueprtizen.smartclothing.domain.clothing.dto.ClothingConfirmResponseDTO;
import sueprtizen.smartclothing.domain.clothing.dto.ClothingUpdateRequestDTO;
import sueprtizen.smartclothing.domain.clothing.entity.*;
import sueprtizen.smartclothing.domain.clothing.exception.ClothingErrorCode;
import sueprtizen.smartclothing.domain.clothing.exception.ClothingException;
import sueprtizen.smartclothing.domain.clothing.repository.*;
import sueprtizen.smartclothing.domain.users.entity.User;
import sueprtizen.smartclothing.domain.users.exception.UserErrorCode;
import sueprtizen.smartclothing.domain.users.exception.UserException;
import sueprtizen.smartclothing.domain.users.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClothingServiceImpl implements ClothingService {


    private final UserRepository userRepository;
    private final UserClothingRepository userClothingRepository;
    private final ClothingRepository clothingRepository;
    private final ClothingStyleRepository clothingStyleRepository;
    private final StyleRepository styleRepository;
    private final ClothingSeasonRepository clothingSeasonRepository;

    @Override
    public List<ClosetConfirmResponseDTO> closetConfirmation(int userId) {

        User currentUser = getUser(userId);

        List<UserClothing> allClothing = userClothingRepository.findAllByUser(currentUser);

        return allClothing.stream().map(userClothing ->
                ClosetConfirmResponseDTO.createFromUserClothing(userClothing.getClothing())
        ).toList();
    }

    @Override
    public ClothingConfirmResponseDTO clothingConfirmation(int userId, int clothingId) {

        User currentUser = getUser(userId);

        Clothing clothing = clothingRepository.findById(clothingId)
                .orElseThrow(() -> new ClothingException(ClothingErrorCode.CLOTHING_NOT_FOUND));

        UserClothing userClothing = userClothingRepository.findUserClothingByClothing(currentUser, clothing)
                .orElseThrow(() -> new ClothingException(ClothingErrorCode.CLOTHING_NOT_FOUND));

        return new ClothingConfirmResponseDTO(clothing, userClothing, currentUser.getUserId() == clothing.getOwnerId());
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

        List<Style> newStyleList = styleRepository.findAllByStyleNameIn(clothingUpdateRequestDTO.styleList())
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

        List<ClothingSeason> newSeasonList = clothingUpdateRequestDTO.seasonList().stream().map(month ->
                ClothingSeason.builder()
                        .userClothing(userClothing)
                        .month(month)
                        .build()
        ).toList();

        //새로운 계절 연결
        clothingSeasonRepository.saveAll(newSeasonList);

        //옷 정보 업데이트
        clothing.updateClothing(newClothingStyleList, clothingUpdateRequestDTO.category());

        //사용자 옷 연결 업데이트
        userClothing.updateUserClothing(clothingUpdateRequestDTO.clothingName(), clothing, newSeasonList);

    }


    private User getUser(int userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new UserException(UserErrorCode.NOT_FOUND_MEMBER));
    }

}
