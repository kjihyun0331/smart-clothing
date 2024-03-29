package sueprtizen.smartclothing.socket.machine.service;

import sueprtizen.smartclothing.socket.machine.dto.AirdresserResponseDTO;
import sueprtizen.smartclothing.socket.machine.dto.WasherResponseDTO;

import java.util.List;

public interface AirdresserService {
    List<AirdresserResponseDTO> getAllOutfitList();
    List<AirdresserResponseDTO> getMainOutfitList();
}
