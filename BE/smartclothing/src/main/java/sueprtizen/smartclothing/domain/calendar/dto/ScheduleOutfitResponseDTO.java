package sueprtizen.smartclothing.domain.calendar.dto;

public record ScheduleOutfitResponseDTO(
        int scheduleId,
        String scheduleCategory,
        String scheduleName,
        String outfitImagePath
) {
}
