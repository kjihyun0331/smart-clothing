package sueprtizen.smartclothing.domain.clothing.dto;

import lombok.Builder;

@Builder
public record SocketClothingInfoDTO(String category, Integer wornCount) {

}
