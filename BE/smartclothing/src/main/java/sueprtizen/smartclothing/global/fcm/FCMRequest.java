package sueprtizen.smartclothing.global.fcm;

import lombok.Builder;

@Builder
public record FCMRequest(String title, String body, String targetToken) {
}