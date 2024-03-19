package sueprtizen.smartclothing.domain.clothing.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ClothingAllResponseDTO {
    @Schema(description = "옷 아이디", example = "1")
    private int clothingId;
    @Schema(description = "옷 이미지 주소", example = "aaaa/bbb.png")
    private String clothingImagePath;
}
