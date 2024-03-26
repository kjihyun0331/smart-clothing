package sueprtizen.smartclothing.socket.global;

import lombok.Builder;
import lombok.ToString;
import sueprtizen.smartclothing.global.dto.Message;

import java.util.List;
import java.util.Optional;
import java.util.ResourceBundle;

@ToString
@Builder
public class ResponseDTO<T> {
    private String requestNumber;
    private Long count;
    private T result;

    public static <T> ResponseDTO<T> success(String requestNumber,Long cnt,T dataBody) {
        return ResponseDTO.<T>builder()
                .requestNumber(requestNumber)
                .result(dataBody)
                .count(cnt)
                .build();
    }
}
