package sueprtizen.smartclothing.domain.clothing.service;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import sueprtizen.smartclothing.domain.clothing.dto.ClosetConfirmResponseDTO;
import sueprtizen.smartclothing.domain.clothing.dto.ClothingConfirmResponseDTO;
import sueprtizen.smartclothing.domain.clothing.dto.ClothingPositionResponseDTO;
import sueprtizen.smartclothing.domain.clothing.dto.ClothingUpdateRequestDTO;

import java.util.List;

public interface ClothingService {
    List<ClosetConfirmResponseDTO> closetConfirmation(int userId);

    ClothingConfirmResponseDTO clothingConfirmation(int userId, int clothingId);

    void removeClothing(int userId, int clothingId);

    void updateClothing(int userId, ClothingUpdateRequestDTO clothingUpdateRequestDTO);

    List<ClothingPositionResponseDTO> getClothingPosition(int userId);

    JSONObject getClothingInfo(String rfidUid);

    JSONObject getClothingImage(String rfidUid);

    void addClothes(String rfid, JSONArray users, Long detailId);

    void putClothingIntoWasher(String rfid);

    void putClothingIntoAirdresser(String rfid);

}
