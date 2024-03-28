package sueprtizen.smartclothing.domain.outfit.past.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sueprtizen.smartclothing.domain.calendar.entity.Schedule;
import sueprtizen.smartclothing.domain.calendar.repository.CalendarRepository;
import sueprtizen.smartclothing.domain.clothing.entity.Clothing;
import sueprtizen.smartclothing.domain.outfit.past.dto.ClothingDTO;
import sueprtizen.smartclothing.domain.outfit.past.dto.PastOutFitResponseDTO;
import sueprtizen.smartclothing.domain.outfit.past.dto.ScheduleDTO;
import sueprtizen.smartclothing.domain.outfit.past.dto.WeatherDTO;
import sueprtizen.smartclothing.domain.outfit.past.entity.PastOutfit;
import sueprtizen.smartclothing.domain.outfit.past.repository.PastOutfitRepository;
import sueprtizen.smartclothing.domain.users.entity.User;
import sueprtizen.smartclothing.domain.users.exception.UserErrorCode;
import sueprtizen.smartclothing.domain.users.exception.UserException;
import sueprtizen.smartclothing.domain.users.repository.UserRepository;
import sueprtizen.smartclothing.domain.weather.entity.Weather;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PastOutfitServiceImpl implements PastOutfitService {
    final private UserRepository userRepository;
    final private CalendarRepository calendarRepository;
    final private PastOutfitRepository pastOutfitRepository;

    @Override
    public List<PastOutFitResponseDTO> pastOutfitsConfirmation(int userId) {
        User currentUser = getUser(userId);

        List<Schedule> scheduleList = calendarRepository.findAllByUserOrderByDateAsc(currentUser);

        List<PastOutFitResponseDTO> pastOutFitResponseDTOList = new ArrayList<>();

        for (Schedule schedule : scheduleList) {
            List<PastOutfit> pastOutFitList = pastOutfitRepository.findAllBySchedule(schedule);

            List<ClothingDTO> clothingDTOList = pastOutFitList.stream().map(pastOutfit -> {
                        Clothing clothing = pastOutfit.getClothing();
                        return ClothingDTO.builder()
                                .clothingId(clothing.getClothingId())
                                .clothingImagePath(clothing.getClothingDetail().getClothingImgPath())
                                .build();
                    }
            ).toList();


            ScheduleDTO scheduleDTO = ScheduleDTO.builder()
                    .scheduleId(schedule.getScheduleId())
                    .scheduleCategory(schedule.getScheduleCategory())
                    .date(schedule.getDate())
                    .build();

            Weather weather = schedule.getWeather();
            WeatherDTO weatherDTO = WeatherDTO.builder()
                    .highestTemperature(weather.getHighestTemperature())
                    .lowestTemperature(weather.getLowestTemperature())
                    .icon(weather.getIcon())
                    .build();


            pastOutFitResponseDTOList.add(new PastOutFitResponseDTO(scheduleDTO, clothingDTOList, weatherDTO));
        }


        return pastOutFitResponseDTOList;
    }

    private User getUser(int userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new UserException(UserErrorCode.NOT_FOUND_MEMBER));
    }
}