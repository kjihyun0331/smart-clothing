package sueprtizen.smartclothing.domain.weather.dto;

public record WeatherResponseDTO(
        int icon,
        int lowestTemperature,
        int highestTemperature,
        int lowestRealFeelingTemperature,
        int highestRealFeelingTemperature,
        int precipitation,
        int snowCover,
        int humidity,
        int windSpeed,
        int solarIrradiance,
        int UV,
        String UVMessage
) {
}