package sueprtizen.smartclothing.domain.weather.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sueprtizen.smartclothing.domain.weather.entity.Weather;

@Repository
public interface WeatherRepository extends JpaRepository<Weather, Integer> {
}
