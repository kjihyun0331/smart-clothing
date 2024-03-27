package sueprtizen.smartclothing.domain.weather.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity
public class Weather {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int WeatherId;

    @Column(nullable = false)
    private int locationKey;

    @Column(nullable = false)
    private int icon;

    @Column(nullable = false)
    private int lowestTemperature;

    @Column(nullable = false)
    private int highestTemperature;

    @Column(nullable = false)
    private int highestRealFeelingTemperature;

    @Column(nullable = false)
    private int lowestRealFeelingTemperature;

    @Column(nullable = false)
    private int precipitation;

    @Column(nullable = false)
    private int snowCover;

    @Column(nullable = false)
    private int humidity;

    @Column(nullable = false)
    private int windSpeed;

    @Column(nullable = false)
    private int solarIrradiance;

    @Column(nullable = false)
    private String date;

    @Column(nullable = false)
    private int uv;

    @Column(nullable = false, name = "uv_message")
    private String UVMessage;
}
