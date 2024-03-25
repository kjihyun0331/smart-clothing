package sueprtizen.smartclothing.domain.clothing.dto;

import lombok.Builder;
import sueprtizen.smartclothing.domain.clothing.entity.Clothing;
import sueprtizen.smartclothing.domain.clothing.entity.ClothingSeason;
import sueprtizen.smartclothing.domain.clothing.entity.UserClothing;

import java.util.List;

public record ClothingConfirmResponseDTO(
        int clothingId,
        String clothingName,
        String category,
        List<String> styleList,
        List<Integer> season,
        String clothingImgPath,
        List<String> textureList,

        boolean isMyClothing

) {
    public ClothingConfirmResponseDTO(Clothing clothing, UserClothing userClothing, boolean isMyClothing) {
        this(clothing.getClothingId(),
                userClothing.getClothingName(),
                clothing.getCategory(),
                clothing.getClothingStyleList().stream().map(clothingStyle -> clothingStyle.getStyle().getStyleName()).toList(),
                userClothing.getClothingSeasonList().stream().map(ClothingSeason::getMonth).toList(),
                clothing.getClothingDetail().getClothingImgPath(),
                clothing.getClothingDetail().getClothingTextures().stream().map(clothingTexture -> clothingTexture.getTexture().getTextureName()).toList(),
                isMyClothing
        );
    }
}
