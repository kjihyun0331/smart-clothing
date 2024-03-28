package sueprtizen.smartclothing.domain.calendar.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sueprtizen.smartclothing.domain.calendar.dto.*;
import sueprtizen.smartclothing.domain.calendar.entity.Schedule;
import sueprtizen.smartclothing.domain.calendar.exception.CalendarErrorCode;
import sueprtizen.smartclothing.domain.calendar.exception.CalendarException;
import sueprtizen.smartclothing.domain.calendar.repository.CalendarRepository;
import sueprtizen.smartclothing.domain.users.entity.User;
import sueprtizen.smartclothing.domain.users.exception.UserErrorCode;
import sueprtizen.smartclothing.domain.users.exception.UserException;
import sueprtizen.smartclothing.domain.users.repository.UserRepository;
import sueprtizen.smartclothing.domain.weather.entity.Weather;
import sueprtizen.smartclothing.domain.weather.exception.WeatherErrorCode;
import sueprtizen.smartclothing.domain.weather.exception.WeatherException;
import sueprtizen.smartclothing.domain.weather.repository.WeatherRepository;

import java.time.LocalDate;
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
                LocalDate.parse(startDate),
                LocalDate.parse(endDate)
        ).stream().map(schedule ->
                new ScheduleDTO(
                        schedule.getScheduleId(),
                        schedule.getScheduleName(),
                        schedule.getScheduleCategory(),
                        schedule.getDate().toString()
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
                .scheduleCategory(scheduleSaveRequestDTO.category())
                .user(currentUser)
                .weather(weather)
                .date(LocalDate.parse(scheduleSaveRequestDTO.date()))
                .locationKey(scheduleSaveRequestDTO.locationKey())
                .build();

        calendarRepository.save(newScheDule);
    }

    @Override
    public void scheduleDelete(int userId, String date) {
        User currentUser = getUser(userId);

        LocalDate scheduleDate = LocalDate.parse(date);

        Schedule schedule = calendarRepository.findScheduleByUserAndDate(currentUser, scheduleDate)
                .orElseThrow(() -> new CalendarException(CalendarErrorCode.SCHEDULE_NOT_FOUND));

        calendarRepository.delete(schedule);
    }

    @Override
    public ScheduleDetailResponseDTO scheduleConfirmation(int userId, String date) {
        User currentUser = getUser(userId);

        LocalDate scheduleDate = LocalDate.parse(date);

        Schedule schedule = calendarRepository.findScheduleByUserAndDate(currentUser, scheduleDate)
                .orElseThrow(() -> new CalendarException(CalendarErrorCode.SCHEDULE_NOT_FOUND));

        ScheduleDTO scheduleDTO = new ScheduleDTO(
                schedule.getScheduleId(),
                schedule.getScheduleName(),
                schedule.getScheduleCategory(),
                schedule.getDate().toString()
        );

        List<OutfitDTO> outfitDTOList;
        if (scheduleDate.isBefore(LocalDate.now())) {
            outfitDTOList = schedule.getPastOutfits().stream().map(pastOutfit ->
                    new OutfitDTO(
                            pastOutfit.getPastOutfitId(),
                            pastOutfit.getClothing().getClothingDetail().getClothingImgPath(),
                            pastOutfit.getX(),
                            pastOutfit.getY(),
                            pastOutfit.getWidth(),
                            pastOutfit.getHeight()
                    )
            ).toList();
        } else {
            outfitDTOList = schedule.getRecommendedOutfits().stream().map(recommendedOutfit ->
                    new OutfitDTO(
                            recommendedOutfit.getRecommendedOutfitId(),
                            recommendedOutfit.getClothing().getClothingDetail().getClothingImgPath(),
                            recommendedOutfit.getX(),
                            recommendedOutfit.getY(),
                            recommendedOutfit.getWidth(),
                            recommendedOutfit.getHeight()
                    )
            ).toList();
        }


        return new ScheduleDetailResponseDTO(
                scheduleDTO,
                outfitDTOList
        );
    }

    @Override
    public TodayScheduleOutfitResponseDTO todayScheduleOutfitConformation(int userId) {
        User currentUser = getUser(userId);

//        LocalDate today = LocalDate.now();

        LocalDate today = LocalDate.of(2024, 3, 27);

        Schedule schedule = calendarRepository.findScheduleByUserAndDate(currentUser, today)
                .orElseThrow(() -> new CalendarException(CalendarErrorCode.SCHEDULE_NOT_FOUND));

        return new TodayScheduleOutfitResponseDTO(
                schedule.getScheduleId(),
                schedule.getScheduleCategory(),
                schedule.getScheduleName(),
                schedule.getOutfitImagePath()
        );
    }


    private User getUser(int userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new UserException(UserErrorCode.NOT_FOUND_MEMBER));
    }
}
