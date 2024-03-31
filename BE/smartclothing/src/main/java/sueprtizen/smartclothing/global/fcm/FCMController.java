package sueprtizen.smartclothing.global.fcm;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/notifications")
@RestController
@RequiredArgsConstructor
public class FCMController {

    private final FCMService fcmService;

    @PostMapping("/")
    public ResponseEntity<String> sendNotification(@RequestBody @Valid FCMRequest request) {
        String response = fcmService.sendNotification(request);
        return ResponseEntity.ok(response);
    }
}