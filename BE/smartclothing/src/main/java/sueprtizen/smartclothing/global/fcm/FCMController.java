package sueprtizen.smartclothing.global.fcm;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FCMController {

    private final FCMService fcmService;

    @Autowired
    public FCMController(FCMService fcmService) {
        this.fcmService = fcmService;
    }

    @PostMapping("/notification")
    public ResponseEntity<String> sendNotification(@RequestBody @Valid FCMRequest request) {
        String response = fcmService.sendNotification(request);
        return ResponseEntity.ok(response);
    }
}