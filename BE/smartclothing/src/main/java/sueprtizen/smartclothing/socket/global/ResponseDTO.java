package sueprtizen.smartclothing.socket.global;

import lombok.Builder;
import lombok.ToString;

import java.util.List;
import java.util.Optional;
import java.util.ResourceBundle;

@ToString
@Builder
public class ResponseDTO<T> {
    private String requestNumber;
    private Long count;
    private Optional<T> result;

    public ResponseDTO<T> all(){
        ResponseDTO.builder()
    }
}
