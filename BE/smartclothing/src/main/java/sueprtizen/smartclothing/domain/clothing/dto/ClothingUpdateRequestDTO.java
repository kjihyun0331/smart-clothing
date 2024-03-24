package sueprtizen.smartclothing.domain.clothing.dto;

import java.util.List;

public record ClothingUpdateRequestDTO(
        int clothingId,
        String nowAt,
        String clothingName,
        String washedAt,
        String category,
        List<String> styleList,
        List<Integer> season
) {
}
