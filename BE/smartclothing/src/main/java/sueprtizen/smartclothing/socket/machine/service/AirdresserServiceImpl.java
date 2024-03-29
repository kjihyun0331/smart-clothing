package sueprtizen.smartclothing.socket.machine.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sueprtizen.smartclothing.domain.calendar.entity.Schedule;
import sueprtizen.smartclothing.socket.clothes.dto.SocketUserResponseDTO;
import sueprtizen.smartclothing.socket.machine.dto.AirdresserResponseDTO;
import sueprtizen.smartclothing.socket.machine.repository.AirdresserRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AirdresserServiceImpl implements AirdresserService {
    private final AirdresserRepository airdresserRepository;

    LocalDate today = LocalDate.now();

    @Transactional(readOnly = true)
    public List<JSONObject> getAllOutfitList() {
        List<Schedule> schedules = airdresserRepository.findAllByDateIsAfter(today);
        List<AirdresserResponseDTO> scheduleDtos = schedules.stream().map(entity -> AirdresserResponseDTO.builder()
                .image(entity.getOutfitImagePath())
                .schedule(entity.getScheduleName())
                .userName(entity.getUser().getUserName())
                .build()
        ).collect(Collectors.toList());

        List<JSONObject> jsonArray = new ArrayList<JSONObject>();
        for (AirdresserResponseDTO dto : scheduleDtos) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("image", dto.image());
            jsonObject.put("schedule", dto.schedule());
            jsonObject.put("userName", dto.userName());
            jsonArray.add(jsonObject);
        }

        return jsonArray;
    }

    @Transactional(readOnly = true)
    public List<JSONObject> getMainOutfitList() {
        List<Schedule> schedules = airdresserRepository.findTop2ByDateIsAfter(today);
        List<AirdresserResponseDTO> scheduleDtos = schedules.stream().map(entity -> AirdresserResponseDTO.builder()
                .image(entity.getOutfitImagePath())
                .schedule(entity.getScheduleName())
                .userName(entity.getUser().getUserName())
                .build()
        ).collect(Collectors.toList());

        List<JSONObject> jsonArray = new ArrayList<JSONObject>();
        for (AirdresserResponseDTO dto : scheduleDtos) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("image", dto.image());
            jsonObject.put("schedule", dto.schedule());
            jsonObject.put("userName", dto.userName());
            jsonArray.add(jsonObject);
        }

        return jsonArray;
    }

}
