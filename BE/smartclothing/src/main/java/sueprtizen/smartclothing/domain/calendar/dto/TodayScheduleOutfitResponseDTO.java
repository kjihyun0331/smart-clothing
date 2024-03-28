package sueprtizen.smartclothing.domain.calendar.dto;

public record TodayScheduleOutfitResponseDTO(
        int scheduleId,
        String scheduleCategory,
        String scheduleName,
        String outfitImagePath
) {
}
