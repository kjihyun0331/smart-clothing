package sueprtizen.smartclothing.domain.outfit.past.dto;

import java.util.List;

public record PastOutFitResponseDTO(
        ScheduleDTO schedule,

        List<ClothingDTO> clothing,

        WeatherDTO weather
) {
}
