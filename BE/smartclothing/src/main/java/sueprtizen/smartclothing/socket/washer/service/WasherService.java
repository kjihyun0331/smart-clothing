package sueprtizen.smartclothing.socket.washer.service;

import org.json.simple.JSONObject;
import org.springframework.transaction.annotation.Transactional;
import sueprtizen.smartclothing.domain.clothing.entity.Clothing;

import java.util.List;



public interface WasherService {
    List<Clothing> getAllLaundryList();
}
