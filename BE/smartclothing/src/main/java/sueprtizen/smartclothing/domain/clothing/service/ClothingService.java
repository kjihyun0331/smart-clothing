package sueprtizen.smartclothing.domain.clothing.service;

import sueprtizen.smartclothing.domain.clothing.dto.ClosetConfirmResponseDTO;
import sueprtizen.smartclothing.domain.clothing.dto.ClothingConfirmResponseDTO;
import sueprtizen.smartclothing.domain.clothing.dto.ClothingUpdateRequestDTO;

import java.util.List;

public interface ClothingService {
    List<ClosetConfirmResponseDTO> closetConfirmation(int userId);

    ClothingConfirmResponseDTO clothingConfirmation(int userId, int clothingId);

    void removeClothing(int userId, int clothingId);

    void updateClothing(int userId, ClothingUpdateRequestDTO clothingUpdateRequestDTO);
}
