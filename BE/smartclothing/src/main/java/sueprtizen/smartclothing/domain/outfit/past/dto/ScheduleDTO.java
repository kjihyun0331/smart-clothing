package sueprtizen.smartclothing.domain.outfit.past.dto;

import lombok.Builder;

@Builder
public record ScheduleDTO(
        int scheduleId,
        String date,
        String scheduleCategory
) {
}
