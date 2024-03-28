package sueprtizen.smartclothing.socket.user.dto;

import lombok.Builder;

@Builder
public record SocketUserResponseDTO(Integer userId, String userName) {
}
