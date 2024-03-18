package sueprtizen.smartclothing.global;

import com.fasterxml.jackson.databind.ser.Serializers;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseResponse {
    private String result;
    private String reason;

    public BaseResponse(){
        this.result=MessageUtils.success;
        this.reason="";
    }
    public BaseResponse(String result){
        this.reason = MessageUtils.fail;
        this.result=result;
    }
}
