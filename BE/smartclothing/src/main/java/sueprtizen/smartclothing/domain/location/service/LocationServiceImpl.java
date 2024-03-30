package sueprtizen.smartclothing.domain.location.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sueprtizen.smartclothing.domain.location.dto.SiDoDTO;
import sueprtizen.smartclothing.domain.location.dto.SiDoResponseDTO;
import sueprtizen.smartclothing.domain.location.dto.SiGunGuDTO;
import sueprtizen.smartclothing.domain.location.dto.SiGunGuResponseDTO;
import sueprtizen.smartclothing.domain.location.entity.SiDo;
import sueprtizen.smartclothing.domain.location.entity.SiGunGu;
import sueprtizen.smartclothing.domain.location.exception.LocationErrorCode;
import sueprtizen.smartclothing.domain.location.exception.LocationException;
import sueprtizen.smartclothing.domain.location.repository.SiDoRepository;
import sueprtizen.smartclothing.domain.location.repository.SiGunGuRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LocationServiceImpl implements LocationService {
    final SiDoRepository siDoRepository;
    final SiGunGuRepository siGunGuRepository;

    @Override
    public SiDoResponseDTO AllSiDo() {
        return new SiDoResponseDTO(
                siDoRepository.findAll().
                        stream().map(s -> new SiDoDTO(
                                s.getSiDoId(),
                                s.getSiDoName()
                        )).toList()
        );
    }

    @Override
    public SiGunGuResponseDTO AllSiGunGuInSiDo(int siDoId) {
        SiDo sido = siDoRepository.findBySiDoId(siDoId);
        List<SiGunGuDTO> siGunGus = siGunGuRepository.findAllBySiDo(sido);
        return new SiGunGuResponseDTO(siGunGus);
    }
}