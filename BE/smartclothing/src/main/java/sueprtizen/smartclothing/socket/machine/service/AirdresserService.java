package sueprtizen.smartclothing.socket.machine.service;

import org.json.simple.JSONObject;
import sueprtizen.smartclothing.socket.machine.dto.AirdresserResponseDTO;
import sueprtizen.smartclothing.socket.machine.dto.WasherResponseDTO;

import java.util.List;

public interface AirdresserService {
    List<JSONObject> getAllOutfitList();
    List<JSONObject> getMainOutfitList();
}
