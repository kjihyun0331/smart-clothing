package sueprtizen.smartclothing.domain.clothing.dto;

import java.util.List;

public record ClothingUpdateRequestDTO(
        int clothingId,
        String clothingName,
        String category,
        List<String> styleList,
        List<Integer> seasonList,
        List<Integer> sharedUserIdList
) {
}
