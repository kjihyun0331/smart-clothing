package sueprtizen.smartclothing.socket.washer.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sueprtizen.smartclothing.domain.clothing.entity.Clothing;
import sueprtizen.smartclothing.socket.global.ResponseDTO;
import sueprtizen.smartclothing.socket.global.SocketService;
import sueprtizen.smartclothing.socket.washer.repository.WasherRepository;

import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AllLaundryList implements SocketService {

    private final WasherRepository washerRepository;

    @Override
    public ResponseDTO<Optional> execute(JSONObject requestJson) {
        Optional<Clothing> clothing = washerRepository.findAllByNowAt("세탁기");
        return new ResponseDTO.builder()
    }
}
