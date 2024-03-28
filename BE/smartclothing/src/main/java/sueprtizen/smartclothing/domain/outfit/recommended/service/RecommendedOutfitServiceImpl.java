package sueprtizen.smartclothing.domain.outfit.recommended.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sueprtizen.smartclothing.domain.calendar.entity.Schedule;
import sueprtizen.smartclothing.domain.calendar.repository.CalendarRepository;
import sueprtizen.smartclothing.domain.outfit.recommended.dto.PastOutfitResponseDTO;
import sueprtizen.smartclothing.domain.outfit.recommended.dto.ScheduleDTO;
import sueprtizen.smartclothing.domain.outfit.recommended.dto.WeatherDTO;
import sueprtizen.smartclothing.domain.outfit.recommended.repository.RecommendedOutfitRepository;
import sueprtizen.smartclothing.domain.users.entity.User;
import sueprtizen.smartclothing.domain.users.exception.UserErrorCode;
import sueprtizen.smartclothing.domain.users.exception.UserException;
import sueprtizen.smartclothing.domain.users.repository.UserRepository;
import sueprtizen.smartclothing.domain.weather.entity.Weather;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class RecommendedOutfitServiceImpl implements RecommendedOutfitService {

    final UserRepository userRepository;
    final CalendarRepository calendarRepository;
    final RecommendedOutfitRepository recommendedOutfitRepository;

    @Override
    public List<PastOutfitResponseDTO> pastOutfitConformation(int userId) {
        User currentUser = getUser(userId);

        List<Schedule> scheduleList = calendarRepository.findAllByUserOrderByDateAsc(currentUser);

        List<PastOutfitResponseDTO> pastOutfitResponseDTOList = new ArrayList<>();

        for (Schedule schedule : scheduleList) {

            ScheduleDTO scheduleDTO = ScheduleDTO.builder()
                    .scheduleId(schedule.getScheduleId())
                    .scheduleCategory(schedule.getScheduleCategory())
                    .date(schedule.getDate().toString())
                    .outfitImagePath(schedule.getOutfitImagePath())
                    .build();

            Weather weather = schedule.getWeather();
            WeatherDTO weatherDTO = WeatherDTO.builder()
                    .highestTemperature(weather.getHighestTemperature())
                    .lowestTemperature(weather.getLowestTemperature())
                    .icon(weather.getIcon())
                    .build();


            pastOutfitResponseDTOList.add(new PastOutfitResponseDTO(scheduleDTO, weatherDTO));
        }


        return pastOutfitResponseDTOList;
    }

    private User getUser(int userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new UserException(UserErrorCode.NOT_FOUND_MEMBER));
    }
}
