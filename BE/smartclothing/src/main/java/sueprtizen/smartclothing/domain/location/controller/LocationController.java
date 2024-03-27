package sueprtizen.smartclothing.domain.location.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sueprtizen.smartclothing.domain.location.dto.SiDoResponseDTO;
import sueprtizen.smartclothing.domain.location.service.LocationService;
import sueprtizen.smartclothing.global.dto.Message;

@RequestMapping("/location")
@RestController
@RequiredArgsConstructor
public class LocationController {
    final LocationService locationService;
    @GetMapping("/si-do")
    public ResponseEntity<Message<SiDoResponseDTO>> getSiDo() {
        return ResponseEntity.ok(Message.success(locationService.AllSiDo()));
    }


}

