package sueprtizen.smartclothing.domain.outfit.past.dto;

import lombok.Builder;

@Builder
public record WeatherDTO(
        int icon,
        int lowestTemperature,
        int highestTemperature
) {
}
