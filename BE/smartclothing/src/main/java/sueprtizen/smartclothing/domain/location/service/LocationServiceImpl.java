package sueprtizen.smartclothing.domain.location.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sueprtizen.smartclothing.domain.location.dto.SiDoDTO;
import sueprtizen.smartclothing.domain.location.dto.SiDoResponseDTO;
import sueprtizen.smartclothing.domain.location.repository.SiDoRepository;
import sueprtizen.smartclothing.domain.location.repository.SiGunGuRepository;

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
}