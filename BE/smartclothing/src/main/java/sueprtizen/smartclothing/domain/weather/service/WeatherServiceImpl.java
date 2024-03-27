package sueprtizen.smartclothing.domain.weather.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sueprtizen.smartclothing.domain.weather.dto.WeatherResponseDTO;
import sueprtizen.smartclothing.domain.weather.entity.Weather;
import sueprtizen.smartclothing.domain.weather.exception.WeatherErrorCode;
import sueprtizen.smartclothing.domain.weather.exception.WeatherException;
import sueprtizen.smartclothing.domain.weather.repository.WeatherRepository;

@Service
@RequiredArgsConstructor
public class WeatherServiceImpl implements WeatherService {

    final WeatherRepository weatherRepository;

    @Override
    public WeatherResponseDTO weatherFromLocationAndDate(int locationKey, String date) {
        Weather weather = weatherRepository.findByLocationKeyAndDate(locationKey, date)
                .orElseThrow(() -> new WeatherException(WeatherErrorCode.WEATHER_NOT_FOUND));
        return new WeatherResponseDTO(
                weather.getIcon(),
                weather.getLowestTemperature(),
                weather.getHighestTemperature(),
                weather.getLowestRealFeelingTemperature(),
                weather.getHighestRealFeelingTemperature(),
                weather.getPrecipitation(),
                weather.getSnowCover(),
                weather.getHumidity(),
                weather.getWindSpeed(),
                weather.getSolarIrradiance(),
                weather.getUv(),
                weather.getUVMessage()

        );
    }
}