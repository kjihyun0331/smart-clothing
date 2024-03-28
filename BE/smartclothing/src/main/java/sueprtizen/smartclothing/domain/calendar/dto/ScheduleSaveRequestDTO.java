package sueprtizen.smartclothing.domain.calendar.dto;

public record ScheduleSaveRequestDTO(
        String date,
        String title,
        String category,
        int locationKey
) {
}
