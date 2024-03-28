package sueprtizen.smartclothing.domain.outfit.past.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sueprtizen.smartclothing.domain.outfit.past.dto.PastOutFitResponseDTO;
import sueprtizen.smartclothing.domain.outfit.past.service.PastOutfitService;
import sueprtizen.smartclothing.global.dto.Message;

import java.util.List;

@RequestMapping("/outfit/past")
@RestController
@RequiredArgsConstructor
public class PastOutfitController {

    final private PastOutfitService pastOutfitService;

    @GetMapping()
    public ResponseEntity<Message<List<PastOutFitResponseDTO>>> getPastOutfitList(
            @RequestHeader("User-Id") int userId
    ) {
        return ResponseEntity.ok(Message.success(pastOutfitService.pastOutfitsConfirmation(userId)));
    }
}
