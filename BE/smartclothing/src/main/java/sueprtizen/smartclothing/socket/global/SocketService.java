package sueprtizen.smartclothing.socket.global;

import org.apache.coyote.Response;
import org.json.simple.JSONObject;

import java.util.Optional;

public interface SocketService {
    ResponseDTO<Optional> execute(JSONObject requestJson);
}
