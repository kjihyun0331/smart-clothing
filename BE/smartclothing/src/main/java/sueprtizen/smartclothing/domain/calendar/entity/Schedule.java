package sueprtizen.smartclothing.domain.calendar.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import sueprtizen.smartclothing.domain.users.entity.User;
import sueprtizen.smartclothing.domain.weather.entity.Weather;

@NoArgsConstructor
@Getter
@Entity
@Table(schema = "schedule")
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int scheduleId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    @ManyToOne
    @JoinColumn(name = "weather_id", nullable = false)
    private Weather weather;

    @Column(nullable = false)
    private String scheduleName;

    @Column(nullable = false)
    private String date;

    @Column(nullable = false)
    private int locationKey;

    @Builder
    public Schedule(User user, String scheduleName, Weather weather, String date, int locationKey) {
        this.user = user;
        this.weather = weather;
        this.scheduleName = scheduleName;
        this.date = date;
        this.locationKey = locationKey;
    }
}
