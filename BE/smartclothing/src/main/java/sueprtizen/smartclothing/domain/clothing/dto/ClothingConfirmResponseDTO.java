package sueprtizen.smartclothing.domain.clothing.dto;

import sueprtizen.smartclothing.domain.clothing.entity.Clothing;
import sueprtizen.smartclothing.domain.clothing.entity.UserClothing;

import java.util.List;

public record ClothingConfirmResponseDTO(
        int clothingId,
        String nowAt,
        String clothingName,
        String washedAt,
        int polluted,
        String category,
        List<String> styleList,
        List<Integer> season,
        String clothingImgPath,
        List<String> textureList

) {
    public static ClothingConfirmResponseDTO createFromClothingUserClothingUser(Clothing clothing, UserClothing userClothing) {
        return new ClothingConfirmResponseDTO(
                clothing.getClothingId(),
                clothing.getNowAt(),
                userClothing.getClothingName(),
                clothing.getWashedAt(),
                clothing.getPolluted(),
                clothing.getCategory(),
                clothing.getClothingStyles().stream().map(clothingStyle -> clothingStyle.getStyle().getStyleName()).toList(),
                null,
                clothing.getClothingDetail().getClothingImgPath(),
                clothing.getClothingDetail().getClothingTextures().stream().map(clothingTexture -> clothingTexture.getTexture().getTextureName()).toList()
        );
    }
}
