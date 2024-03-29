package sueprtizen.smartclothing.socket.machine.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sueprtizen.smartclothing.domain.calendar.entity.Schedule;
import sueprtizen.smartclothing.socket.machine.dto.AirdresserResponseDTO;
import sueprtizen.smartclothing.socket.machine.repository.AirdresserRepository;

import java.time.LocalDate;
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
    public List<AirdresserResponseDTO> getAllOutfitList() {
        List<Schedule> schedules = airdresserRepository.findAllByDateIsAfter(today);
        return schedules.stream().map(entity -> AirdresserResponseDTO.builder()
                .image(entity.getOutfitImagePath())
                .schedule(entity.getScheduleName())
                .userName(entity.getUser().getUserName())
                .build()
        ).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<AirdresserResponseDTO> getMainOutfitList() {
        List<Schedule> schedules = airdresserRepository.findAllByDateIsAfter(today);
        return schedules.stream().map(entity -> AirdresserResponseDTO.builder()
                .image(entity.getOutfitImagePath())
                .schedule(entity.getScheduleName())
                .userName(entity.getUser().getUserName())
                .build()
        ).collect(Collectors.toList());
    }

}
