package sueprtizen.smartclothing.domain.weather.service;

import sueprtizen.smartclothing.domain.weather.dto.WeatherResponseDTO;

public interface WeatherService {
    WeatherResponseDTO weatherFromLocationAndDate(int locationKey, String date);
}
