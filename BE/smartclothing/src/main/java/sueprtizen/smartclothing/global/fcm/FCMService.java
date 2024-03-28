package sueprtizen.smartclothing.global.fcm;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import org.springframework.stereotype.Service;

@Service
public class FCMService {
    public static String sendNotification(FCMRequest fcmRequest) {
        Message message = Message.builder()
                .putData("title", fcmRequest.title())
                .putData("body", fcmRequest.body())
                .setToken(fcmRequest.targetToken())
                .build();
        try {
            String response = FirebaseMessaging.getInstance().send(message);
            return "Message sent" + response;
        } catch (FirebaseMessagingException e) {
            e.printStackTrace();
            return "Failed to send notification";
        }
    }
}
