package sueprtizen.smartclothing.global.fcm;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sueprtizen.smartclothing.domain.users.entity.User;
import sueprtizen.smartclothing.domain.users.exception.UserErrorCode;
import sueprtizen.smartclothing.domain.users.exception.UserException;
import sueprtizen.smartclothing.domain.users.repository.UserRepository;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FCMServiceImpl implements FCMService {
    private final UserRepository userRepository;

    @Override
    public void saveFCMToken(Integer userId, String token) {
        Optional<User> user = userRepository.findByUserId(userId);
        user.ifPresent(t->{
            if(token!=null){

            }
        });
    }

    @Override
    public void sendMessageTo(Integer userId, String body) {
        // token 찾고
        User user = userRepository.findByUserId(userId).orElseThrow(()
                -> new UserException(UserErrorCode.NOT_FOUND_MEMBER));
        String token = user.getFcmToken();

        // makeMessage 로 리팩토링
        Message message = Message.builder()
                .setToken(token)
                .setNotification(Notification.builder()
                        .setBody(body)
                        .build())
                .build();

        // firebase에 비동기 전송
        FirebaseMessaging.getInstance().sendAsync(message);
    }
}