package sueprtizen.smartclothing.domain.clothing.service;

import sueprtizen.smartclothing.domain.clothing.dto.*;

import java.util.List;

public interface ClothingService {
    List<ClosetConfirmResponseDTO> closetConfirmation(int userId);

    ClothingConfirmResponseDTO clothingConfirmation(int userId, int clothingId);

    void removeClothing(int userId, int clothingId);

    void updateClothing(int userId, ClothingUpdateRequestDTO clothingUpdateRequestDTO);

    SocketClothingInfoDTO getClothingInfo(String rfidUid);

    SocketClothingImageDTO getClothingImage(String rfidUid);

}
