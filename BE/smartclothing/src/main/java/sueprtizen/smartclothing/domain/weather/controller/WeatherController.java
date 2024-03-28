package sueprtizen.smartclothing.domain.weather.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sueprtizen.smartclothing.domain.weather.dto.WeatherResponseDTO;
import sueprtizen.smartclothing.domain.weather.service.WeatherService;
import sueprtizen.smartclothing.global.dto.Message;

@RequestMapping("/weather")
@RestController
@RequiredArgsConstructor
public class WeatherController {

    final WeatherService weatherService;

    @GetMapping()
    public ResponseEntity<Message<WeatherResponseDTO>> weatherFromLocationAndDate(
            @RequestParam int locationKey,
            @RequestParam String date) {
        return ResponseEntity.ok(
                Message.success(weatherService.weatherFromLocationAndDate(locationKey, date))
        );
    }
}

