package sueprtizen.smartclothing.domain.clothing.service;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import sueprtizen.smartclothing.domain.clothing.dto.*;

import java.util.List;

public interface ClothingService {
    List<ClosetConfirmResponseDTO> closetConfirmation(int userId);

    ClothingConfirmResponseDTO clothingConfirmation(int userId, int clothingId);

    void removeClothing(int userId, int clothingId);

    void updateClothing(int userId, ClothingUpdateRequestDTO clothingUpdateRequestDTO);

    JSONObject getClothingInfo(String rfidUid);

    JSONObject getClothingImage(String rfidUid);

    void addClothes(String rfid, JSONArray users, Long detailId);

}
