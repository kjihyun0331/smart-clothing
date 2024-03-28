package sueprtizen.smartclothing.socket.machine.service;

import sueprtizen.smartclothing.socket.machine.dto.WasherResponseDTO;

import java.util.List;



public interface WasherService {
    List<WasherResponseDTO> getAllLaundryList();
}
