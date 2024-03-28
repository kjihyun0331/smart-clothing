package sueprtizen.smartclothing.socket.machine.dto;

import lombok.Builder;

@Builder
public record WasherResponseDTO(
        String clothingImgPath, String texture, Integer worn_count, String schedule, String userName
) {
}