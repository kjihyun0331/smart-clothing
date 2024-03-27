package sueprtizen.smartclothing.domain.weather.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sueprtizen.smartclothing.domain.users.entity.User;
import sueprtizen.smartclothing.domain.weather.entity.Weather;

import java.util.List;

@Repository
public interface WeatherRepository extends JpaRepository<Weather, Integer> {

    List<Weather> findSchedulesByUserAndDateBetweenOrderByDateAsc(User user, String startDate, String endDate);
}
