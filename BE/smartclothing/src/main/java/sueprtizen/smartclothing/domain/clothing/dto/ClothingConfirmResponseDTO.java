package sueprtizen.smartclothing.domain.clothing.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ClothingConfirmResponseDTO {
    private int clothingId;
    private String nowAt;
    private String clothingName;
    private String washedAt;
    private int polluted;
    private String category;
    private List<String> styleList;
    private List<Integer> season;
    private String clothingImgPath;
    private List<String> textureList;
}
