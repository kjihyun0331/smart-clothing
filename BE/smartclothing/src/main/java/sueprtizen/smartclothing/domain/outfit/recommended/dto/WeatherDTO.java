package sueprtizen.smartclothing.domain.outfit.recommended.dto;

import lombok.Builder;

@Builder
public record WeatherDTO(
        int icon,
        int lowestTemperature,
        int highestTemperature
) {
}
