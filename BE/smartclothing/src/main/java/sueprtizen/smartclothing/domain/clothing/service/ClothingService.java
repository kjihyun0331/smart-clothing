package sueprtizen.smartclothing.domain.clothing.service;

import sueprtizen.smartclothing.domain.clothing.dto.ClosetConfirmResponseDTO;

import java.util.List;

public interface ClothingService {
    List<ClosetConfirmResponseDTO> closetConfirmation(int userId);
}
