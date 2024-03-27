package sueprtizen.smartclothing.domain.calendar.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sueprtizen.smartclothing.domain.calendar.dto.CalendarMonthlyScheduleResponseDTO;
import sueprtizen.smartclothing.domain.calendar.dto.ScheduleDTO;
import sueprtizen.smartclothing.domain.calendar.dto.ScheduleSaveRequestDTO;
import sueprtizen.smartclothing.domain.calendar.entity.Schedule;
import sueprtizen.smartclothing.domain.calendar.repository.CalendarRepository;
import sueprtizen.smartclothing.domain.users.entity.User;
import sueprtizen.smartclothing.domain.users.exception.UserErrorCode;
import sueprtizen.smartclothing.domain.users.exception.UserException;
import sueprtizen.smartclothing.domain.users.repository.UserRepository;
import sueprtizen.smartclothing.domain.weather.entity.Weather;
import sueprtizen.smartclothing.domain.weather.exception.WeatherErrorCode;
import sueprtizen.smartclothing.domain.weather.exception.WeatherException;
import sueprtizen.smartclothing.domain.weather.repository.WeatherRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService {
    final UserRepository userRepository;
    final CalendarRepository calendarRepository;
    final WeatherRepository weatherRepository;

    @Override
    public CalendarMonthlyScheduleResponseDTO calendarMonthlySchedules(
            int userId,
            String startDate,
            String endDate
    ) {
        User currentUser = getUser(userId);

        List<ScheduleDTO> schedules = calendarRepository.findSchedulesByUserAndDateBetweenOrderByDateAsc(
                currentUser,
                startDate,
                endDate
        ).stream().map(schedule ->
                new ScheduleDTO(
                        schedule.getScheduleId(),
                        schedule.getDate(),
                        schedule.getScheduleName()
                )
        ).toList();

        return new CalendarMonthlyScheduleResponseDTO(schedules);
    }

    @Override
    public void scheduleSave(int userId, ScheduleSaveRequestDTO scheduleSaveRequestDTO) {
        User currentUser = getUser(userId);

        Weather weather = weatherRepository.findByLocationKeyAndDate(
                scheduleSaveRequestDTO.locationKey(),
                scheduleSaveRequestDTO.date()
        ).orElseThrow(
                () -> new WeatherException(WeatherErrorCode.WEATHER_NOT_FOUND)
        );


        Schedule newScheDule = Schedule.builder()
                .scheduleName(scheduleSaveRequestDTO.title())
                .user(currentUser)
                .weather(weather)
                .date(scheduleSaveRequestDTO.date())
                .locationKey(scheduleSaveRequestDTO.locationKey())
                .build();

        calendarRepository.save(newScheDule);
    }

    private User getUser(int userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new UserException(UserErrorCode.NOT_FOUND_MEMBER));
    }
}
