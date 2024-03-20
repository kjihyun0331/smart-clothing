package sueprtizen.smartclothing.domain.clothing.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sueprtizen.smartclothing.domain.clothing.dto.ClosetConfirmResponseDTO;
import sueprtizen.smartclothing.domain.clothing.dto.ClothingConfirmResponseDTO;
import sueprtizen.smartclothing.domain.clothing.entity.Clothing;
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
    public ClothingConfirmResponseDTO clothingConfirm(int clothingId) {

        Clothing clothing = clothingRepository.findById(clothingId).orElseThrow(
                () -> new IllegalArgumentException("clothing not found")
        );

        return ClothingConfirmResponseDTO.builder()
                .clothingId(clothing.getClothingId())
                .nowAt(clothing.getNowAt())
                .clothingName(clothing.getClothingName())
                .style(null)
                .polluted(clothing.getPolluted())
                .category(clothing.getCategory())
                .washedAt(clothing.getWashedAt())
                .season(null)
                .textureList(clothing.getClothingDetail().getClothingTextures().stream().map(t -> t.getTexture().getTextureName()).toList())
                .clothingImgPath(clothing.getClothingDetail().getClothingImgPath())
                .build();
    }

}
