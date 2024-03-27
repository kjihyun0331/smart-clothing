package sueprtizen.smartclothing.domain.location.exception;

import lombok.Getter;
import sueprtizen.smartclothing.domain.weather.exception.WeatherErrorCode;

@Getter
public class LocationException extends RuntimeException {
    private final sueprtizen.smartclothing.domain.weather.exception.WeatherErrorCode errorCode;

    public LocationException(WeatherErrorCode errorCode) {
        super(errorCode.getErrorMessage());
        this.errorCode = errorCode;
    }
}
