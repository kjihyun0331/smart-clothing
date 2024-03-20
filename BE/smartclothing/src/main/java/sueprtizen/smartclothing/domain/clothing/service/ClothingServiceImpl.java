package sueprtizen.smartclothing.domain.clothing.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sueprtizen.smartclothing.domain.clothing.dto.ClosetConfirmResponseDTO;
import sueprtizen.smartclothing.domain.clothing.dto.ClothingConfirmResponseDTO;
import sueprtizen.smartclothing.domain.clothing.entity.Clothing;
import sueprtizen.smartclothing.domain.clothing.exception.ClothingErrorCode;
import sueprtizen.smartclothing.domain.clothing.exception.ClothingException;
import sueprtizen.smartclothing.domain.clothing.repository.ClothingRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClothingServiceImpl implements ClothingService {
    private final ClothingRepository clothingRepository;

    @Override
    public List<ClosetConfirmResponseDTO> closetConfirmation(int userId) {


        return clothingRepository.findClothingByUser_UserId(userId)
                .stream()
                .map(clothing -> ClosetConfirmResponseDTO.builder()
                        .clothingId(clothing.getClothingId())
                        .clothingImagePath(clothing.getClothingDetail().getClothingImgPath())
                        .build()
                ).toList();
    }

    @Override
    public ClothingConfirmResponseDTO clothingConfirm(int userId, int clothingId) {

        //옷 아이디에 해당하는 옷 가져오기
        Clothing clothing = clothingRepository.findById(clothingId).orElseThrow(
                () -> new ClothingException(ClothingErrorCode.CLOTHING_NOT_FOUND)
        );

        //옷 주인과 사용자 id 비교
        if (clothing.getUser().getUserId() != userId) throw new ClothingException(ClothingErrorCode.CLOTHING_NOT_FOUND);


        //TODO: style, season 추가
        return ClothingConfirmResponseDTO.builder()
                .clothingId(clothing.getClothingId())
                .nowAt(clothing.getNowAt())
                .clothingName(clothing.getClothingName())
                .style(null)
                .polluted(clothing.getPolluted())
                .category(clothing.getCategory())
                .washedAt(clothing.getWashedAt())
                .season(null)
                .textureList(clothing.getClothingDetail().getClothingTextures()
                        .stream().map(t -> t.getTexture().getTextureName()).toList())
                .clothingImgPath(clothing.getClothingDetail().getClothingImgPath())
                .build();
    }

}
