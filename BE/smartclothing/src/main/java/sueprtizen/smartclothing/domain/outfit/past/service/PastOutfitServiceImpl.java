package sueprtizen.smartclothing.domain.outfit.past.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sueprtizen.smartclothing.domain.calendar.entity.Schedule;
import sueprtizen.smartclothing.domain.clothing.entity.Clothing;
import sueprtizen.smartclothing.domain.outfit.past.dto.ClothingDTO;
import sueprtizen.smartclothing.domain.outfit.past.dto.PastOutFitResponseDTO;
import sueprtizen.smartclothing.domain.outfit.past.dto.ScheduleDTO;
import sueprtizen.smartclothing.domain.outfit.past.dto.WeatherDTO;
import sueprtizen.smartclothing.domain.outfit.past.repository.PastOutfitRepository;
import sueprtizen.smartclothing.domain.users.entity.User;
import sueprtizen.smartclothing.domain.users.exception.UserErrorCode;
import sueprtizen.smartclothing.domain.users.exception.UserException;
import sueprtizen.smartclothing.domain.users.repository.UserRepository;
import sueprtizen.smartclothing.domain.weather.entity.Weather;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PastOutfitServiceImpl implements PastOutfitService {
    final private UserRepository userRepository;
    final private PastOutfitRepository pastOutfitRepository;

    @Override
    public List<PastOutFitResponseDTO> pastOutfitsConfirmation(int userId) {
        User currentUser = getUser(userId);

        List<PastOutFitResponseDTO> pastOutFitResponseDTOList = pastOutfitRepository.findAllBySchedule_User(currentUser).stream().map(pastOutfit -> {
                    Schedule schedule = pastOutfit.getSchedule();
                    ScheduleDTO scheduleDTO = ScheduleDTO.builder()
                            .scheduleId(schedule.getScheduleId())
                            .date(schedule.getDate())
                            .scheduleCategory(schedule.getScheduleCategory())
                            .build();

                    Weather weather = schedule.getWeather();
                    WeatherDTO weatherDTO = WeatherDTO.builder()
                            .icon(weather.getIcon())
                            .highestTemperature(weather.getHighestTemperature())
                            .lowestTemperature(weather.getLowestTemperature())
                            .build();

                    List<Clothing> clothingList = pastOutfit.getClothingList();


                    List<ClothingDTO> clothingDTOList = clothingList.stream()
                            .map(clothing -> ClothingDTO.builder()
                                    .clothingId(clothing.getClothingId())
                                    .clothingImagePath(clothing.getClothingDetail().getClothingImgPath())
                                    .build()
                            ).toList();


                    return new PastOutFitResponseDTO(pastOutfit.getPastOutfitId(), scheduleDTO, clothingDTOList, weatherDTO);
                }
        ).toList();
        return pastOutFitResponseDTOList;
    }

    private User getUser(int userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new UserException(UserErrorCode.NOT_FOUND_MEMBER));
    }
}
