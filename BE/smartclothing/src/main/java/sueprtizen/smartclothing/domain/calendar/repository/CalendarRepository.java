package sueprtizen.smartclothing.domain.calendar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sueprtizen.smartclothing.domain.calendar.entity.Calendar;

@Repository
public interface CalendarRepository extends JpaRepository<Calendar, Integer> {
}
