package sueprtizen.smartclothing.domain.calendar.dto;

public record ScheduleSaveRequestDTO(
        String date,
        String title,
        int locationKey
) {
}
