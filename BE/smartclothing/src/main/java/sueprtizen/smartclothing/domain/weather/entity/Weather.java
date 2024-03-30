package sueprtizen.smartclothing.domain.weather.entity;

import jakarta.persistence.*;
import lombok.*;

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
    private String date;

    @Column(nullable = false)
    private int icon;

    @Column(nullable = false)
    private double lowestTemperature;

    @Column(nullable = false)
    private double highestTemperature;

    @Column(nullable = false)
    private double highestRealFeelingTemperature;

    @Column(nullable = false)
    private double lowestRealFeelingTemperature;

    @Column(nullable = false)
    private double precipitation;

    @Column(nullable = false)
    private double snowCover;

    @Column(nullable = false)
    private double humidity;

    @Column(nullable = false)
    private double windSpeed;

    @Column(nullable = false)
    private double solarIrradiance;

    @Column(nullable = false)
    private double uv;

    @Column(nullable = false, name = "uv_message")
    private String UVMessage;

    public Weather(Integer key, String date, int icon, Double value, Double value1, Double value2, Double value3, Double value4, Double value5, Double average, Double value6, Double value7, Double value8, String category) {
        this.locationKey=key;
        this.date=date;
        this.icon=icon;
        this.lowestTemperature=value;
        this.highestTemperature=value1;
        this.highestRealFeelingTemperature=value2;
        this.lowestRealFeelingTemperature=value3;
        this.precipitation=value4;
        this.snowCover=value5;
        this.humidity=average;
        this.windSpeed=value6;
        this.solarIrradiance=value7;
        this.uv=value8;
        this.UVMessage=category;


    }
}
