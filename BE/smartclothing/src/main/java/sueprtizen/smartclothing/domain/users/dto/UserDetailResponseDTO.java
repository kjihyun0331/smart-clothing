package sueprtizen.smartclothing.domain.users.dto;

import lombok.Builder;

@Builder
public record UserDetailResponseDTO(int age, String gender) {
}
