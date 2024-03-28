package sueprtizen.smartclothing.domain.outfit.past.dto;

import java.util.List;

public record PastOutFitResponseDTO(
        int pastOutfitId,

        ScheduleDTO schedule,

        List<ClothingDTO> clothing,

        WeatherDTO weather
) {
}
