package sueprtizen.smartclothing.domain.calendar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sueprtizen.smartclothing.domain.calendar.entity.Schedule;
import sueprtizen.smartclothing.domain.users.entity.User;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface CalendarRepository extends JpaRepository<Schedule, Integer> {

    List<Schedule> findAllByUserOrderByDateAsc(User user);

    List<Schedule> findSchedulesByUserAndDateBetweenOrderByDateAsc(User user, LocalDate startDate, LocalDate endDate);

    Optional<Schedule> findScheduleByUserAndDate(User user, LocalDate date);
}
