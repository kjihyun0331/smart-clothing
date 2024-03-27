package sueprtizen.smartclothing.socket.washer.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sueprtizen.smartclothing.domain.clothing.entity.Clothing;
import sueprtizen.smartclothing.socket.washer.repository.WasherRepository;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class WasherServiceImpl implements WasherService{
    private final WasherRepository washerRepository;

    @Transactional(readOnly = true)
    public List<Clothing> getAllLaundryList(){
        return washerRepository.findAllByNowAt("세탁기");
    }
}
