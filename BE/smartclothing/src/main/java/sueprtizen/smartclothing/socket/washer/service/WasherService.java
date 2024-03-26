package sueprtizen.smartclothing.socket.washer.service;

import org.json.simple.JSONObject;
import sueprtizen.smartclothing.socket.global.ResponseDTO;

import java.util.Optional;

public interface WasherService {

    ResponseDTO getAllLaundryList(JSONObject requestJson);
}
