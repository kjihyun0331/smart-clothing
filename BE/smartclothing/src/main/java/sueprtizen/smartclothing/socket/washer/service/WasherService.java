package sueprtizen.smartclothing.socket.washer.service;

import sueprtizen.smartclothing.domain.clothing.entity.Clothing;

import java.util.List;



public interface WasherService {
    List<Clothing> getAllLaundryList();
}
