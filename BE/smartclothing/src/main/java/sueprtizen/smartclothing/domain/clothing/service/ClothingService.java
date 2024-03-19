package sueprtizen.smartclothing.domain.clothing.service;

import sueprtizen.smartclothing.domain.clothing.dto.ClothingAllResponseDTO;

import java.util.List;

public interface ClothingService {
    List<ClothingAllResponseDTO> closetConfirmation(int userId);
}
