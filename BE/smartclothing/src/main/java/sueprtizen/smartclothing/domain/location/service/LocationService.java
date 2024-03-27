package sueprtizen.smartclothing.domain.location.service;

import sueprtizen.smartclothing.domain.location.dto.SiDoResponseDTO;
import sueprtizen.smartclothing.domain.location.dto.SiGunGuResponseDTO;

public interface LocationService {
    SiDoResponseDTO AllSiDo();

    SiGunGuResponseDTO AllSiGunGuInSiDo(int siDoId);
}
