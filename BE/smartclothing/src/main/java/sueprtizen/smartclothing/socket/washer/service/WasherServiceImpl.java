package sueprtizen.smartclothing.socket.washer.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sueprtizen.smartclothing.domain.clothing.entity.Clothing;
import sueprtizen.smartclothing.socket.washer.dto.WasherResponseDTO;
import sueprtizen.smartclothing.socket.washer.repository.WasherRepository;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class WasherServiceImpl implements WasherService{
    private final WasherRepository washerRepository;

    @Transactional(readOnly = true)
    public List<WasherResponseDTO> getAllLaundryList(){
        List<Clothing> laundry = washerRepository.findAllByNowAt("세탁기");
        return laundry.stream().map(entity -> WasherResponseDTO.builder()
                .worn_count(entity.getWornCount())
                .build()
        ).collect(Collectors.toList());
    }
}
