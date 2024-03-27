package sueprtizen.smartclothing.domain.outfit.past.dto;

import lombok.Builder;

@Builder
public record ClothingDTO(
        int clothingId,
        String clothingImagePath,
        int x,
        int y,
        int width,
        int height
) {

}
