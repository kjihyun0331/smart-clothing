package sueprtizen.smartclothing.domain.weather.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sueprtizen.smartclothing.domain.outfit.recommended.dto.WeatherDTO;
import sueprtizen.smartclothing.domain.weather.entity.Weather;

import java.util.Optional;

@Repository
public interface WeatherRepository extends JpaRepository<Weather, Integer> {
    Optional<Weather> findByLocationKeyAndDate(int locationKey, String date);

}
