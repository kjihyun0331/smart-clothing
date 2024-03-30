package sueprtizen.smartclothing.domain.calendar.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import sueprtizen.smartclothing.domain.calendar.dto.*;
import sueprtizen.smartclothing.domain.calendar.entity.Schedule;
import sueprtizen.smartclothing.domain.calendar.exception.CalendarErrorCode;
import sueprtizen.smartclothing.domain.calendar.exception.CalendarException;
import sueprtizen.smartclothing.domain.calendar.repository.CalendarRepository;
import sueprtizen.smartclothing.domain.clothing.entity.Clothing;
import sueprtizen.smartclothing.domain.clothing.entity.UserClothing;
import sueprtizen.smartclothing.domain.clothing.exception.ClothingErrorCode;
import sueprtizen.smartclothing.domain.clothing.exception.ClothingException;
import sueprtizen.smartclothing.domain.clothing.repository.ClothingRepository;
import sueprtizen.smartclothing.domain.clothing.repository.UserClothingRepository;
import sueprtizen.smartclothing.domain.outfit.recommended.entity.RecommendedOutfit;
import sueprtizen.smartclothing.domain.outfit.recommended.repository.RecommendedOutfitRepository;
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
    final ClothingRepository clothingRepository;
    final RecommendedOutfitRepository recommendedOutfitRepository;
    final UserClothingRepository userClothingRepository;

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
    public void scheduleSave(int userId, ScheduleSaveRequestDTO scheduleSaveRequestDTO, MultipartFile file) {
        User currentUser = getUser(userId);

        Weather weather = weatherRepository.findByLocationKeyAndDate(
                scheduleSaveRequestDTO.locationKey(),
                scheduleSaveRequestDTO.date()
        ).orElseThrow(
                () -> new WeatherException(WeatherErrorCode.WEATHER_NOT_FOUND)
        );

        //TODO: file 저장 후 file 위치 저장

        Schedule newScheDule = Schedule.builder()
                .scheduleName(scheduleSaveRequestDTO.title())
                .scheduleCategory(scheduleSaveRequestDTO.category())
                .user(currentUser)
                .outfitImagePath("https://j10s006.p.ssafy.io/images/8fb97a55-1a04-4f82-a4a5-eb85b1f1a7c4.png")
                .weather(weather)
                .date(LocalDate.parse(scheduleSaveRequestDTO.date()))
                .locationKey(scheduleSaveRequestDTO.locationKey())
                .build();

        calendarRepository.save(newScheDule);

        scheduleSaveRequestDTO.clothing().forEach(
                outfitRequestDTO -> {
                    Clothing clothing = clothingRepository.findById(outfitRequestDTO.clothingId())
                            .orElseThrow(() -> new ClothingException(ClothingErrorCode.CLOTHING_NOT_FOUND));
                    RecommendedOutfit newRecommendedOutfit = new RecommendedOutfit(
                            newScheDule,
                            clothing,
                            outfitRequestDTO.x(),
                            outfitRequestDTO.y(),
                            outfitRequestDTO.width(),
                            outfitRequestDTO.height()
                    );
                    recommendedOutfitRepository.save(newRecommendedOutfit);

                }
        );
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

        List<OutfitResponseDTO> outfitResponseDTOList;
        if (scheduleDate.isBefore(LocalDate.now())) {
            outfitResponseDTOList = schedule.getPastOutfits().stream().map(pastOutfit ->
                    new OutfitResponseDTO(
                            pastOutfit.getPastOutfitId(),
                            pastOutfit.getClothing().getClothingDetail().getClothingImgPath(),
                            0, 0, 0, 0
                    )
            ).toList();
        } else {
            outfitResponseDTOList = schedule.getRecommendedOutfits().stream().map(recommendedOutfit ->
                    new OutfitResponseDTO(
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
                outfitResponseDTOList
        );
    }

    @Override
    public ScheduleOutfitResponseDTO scheduleOutfitConformation(int userId, String date) {
        User currentUser = getUser(userId);

        LocalDate localDate = LocalDate.parse(date);

        Schedule schedule = calendarRepository.findScheduleByUserAndDate(currentUser, localDate)
                .orElseThrow(() -> new CalendarException(CalendarErrorCode.SCHEDULE_NOT_FOUND));

        List<ClothingInfoDTO> clothingInfoDTOList = schedule.getRecommendedOutfits().stream().map(recommendedOutfit ->
                {
                    Clothing clothing = recommendedOutfit.getClothing();
                    UserClothing userClothing = userClothingRepository.findUserClothingByClothing(currentUser, clothing)
                            .orElseThrow(() -> new ClothingException(ClothingErrorCode.CLOTHING_NOT_FOUND));

                    //TODO: 현재 어디에 있는지 확인, 입은 횟수 확인 후 세탁 필요 여부 확인 필요
                    return new ClothingInfoDTO(
                            clothing.getClothingId(),
                            userClothing.getClothingName(),
                            clothing.getClothingDetail().getClothingImgPath(),
                            String.format("현재 %s에 있습니다.", clothing.getNowAt())
                    );
                }
        ).toList();

        return new ScheduleOutfitResponseDTO(
                schedule.getScheduleId(),
                schedule.getScheduleCategory(),
                schedule.getScheduleName(),
                schedule.getOutfitImagePath(),
                clothingInfoDTOList
        );
    }

    @Override
    public ScheduleCheckingResponseDTO scheduleChecking(int userId, String date) {
        User currentUser = getUser(userId);
        return calendarRepository.findScheduleByUserAndDate(currentUser, LocalDate.parse(date)).map(schedule ->
                new ScheduleCheckingResponseDTO(true)
        ).orElseGet(() -> new ScheduleCheckingResponseDTO(false));
    }


    private User getUser(int userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new UserException(UserErrorCode.NOT_FOUND_MEMBER));
    }
}
