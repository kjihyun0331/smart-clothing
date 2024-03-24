package sueprtizen.smartclothing.domain.clothing.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sueprtizen.smartclothing.domain.clothing.dto.ClosetConfirmResponseDTO;
import sueprtizen.smartclothing.domain.clothing.entity.UserClothing;
import sueprtizen.smartclothing.domain.clothing.repository.UserClothingRepository;
import sueprtizen.smartclothing.domain.users.entity.User;
import sueprtizen.smartclothing.domain.users.exception.UserErrorCode;
import sueprtizen.smartclothing.domain.users.exception.UserException;
import sueprtizen.smartclothing.domain.users.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClothingServiceImpl implements ClothingService {
    private final UserClothingRepository userClothingRepository;
    private final UserRepository userRepository;

    @Override
    public List<ClosetConfirmResponseDTO> closetConfirmation(int userId) {

        User currentUser = getUser(userId);

        List<UserClothing> allClothing = userClothingRepository.findAllByUser(currentUser);

        return allClothing.stream().map(userClothing ->
                ClosetConfirmResponseDTO.builder()
                        .clothingId(userClothing.getClothing().getClothingId())
                        .clothingImagePath(userClothing.getClothing().getClothingDetail().getClothingImgPath())
                        .build()
        ).toList();
    }


//    @Override
//    public List<ClosetConfirmResponseDTO> closetConfirmation(int userId) {
//
//
//        return clothingRepository.findClothingByUser_UserId(userId)
//                .stream()
//                .map(clothing -> ClosetConfirmResponseDTO.builder()
//                        .clothingId(clothing.getClothingId())
//                        .clothingImagePath(clothing.getClothingDetail().getClothingImgPath())
//                        .build()
//                ).toList();
//    }
//
//    @Override
//    public ClothingConfirmResponseDTO clothingConfirm(int userId, int clothingId) {
//
//        //옷 아이디에 해당하는 옷 가져오기
//        Clothing clothing = clothingRepository.findById(clothingId).orElseThrow(
//                () -> new ClothingException(ClothingErrorCode.CLOTHING_NOT_FOUND)
//        );
//
//        //옷 주인과 사용자 id 비교
////        if (clothing.getUserId() != userId) throw new ClothingException(ClothingErrorCode.CLOTHING_NOT_FOUND);
//
//        return ClothingConfirmResponseDTO.builder()
//                .clothingId(clothing.getClothingId())
//                .nowAt(clothing.getNowAt())
//                .clothingName(clothing.getUser().)
//                .styleList(clothing.getClothingStyles().stream().map(s -> s.getStyle().getStyleName()).toList())
//                .polluted(clothing.getPolluted())
//                .category(clothing.getCategory())
//                .washedAt(clothing.getWashedAt())
//                .season(clothing.getClothingSeasons().stream().map(ClothingSeason::getMonth).toList())
//                .textureList(clothing.getClothingDetail().getClothingTextures()
//                        .stream().map(t -> t.getTexture().getTextureName()).toList())
//                .clothingImgPath(clothing.getClothingDetail().getClothingImgPath())
//                .build();
//    }

    private User getUser(int userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new UserException(UserErrorCode.NOT_FOUND_MEMBER));
    }

}
