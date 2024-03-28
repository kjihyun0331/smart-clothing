package sueprtizen.smartclothing.domain.calendar.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import sueprtizen.smartclothing.domain.outfit.past.entity.PastOutfit;
import sueprtizen.smartclothing.domain.outfit.recommended.entity.RecommendedOutfit;
import sueprtizen.smartclothing.domain.users.entity.User;
import sueprtizen.smartclothing.domain.weather.entity.Weather;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "schedule")
    private List<RecommendedOutfit> recommendedOutfits = new ArrayList<>();

    @OneToMany(mappedBy = "schedule")
    private List<PastOutfit> pastOutfits = new ArrayList<>();

    @Column(nullable = false)
    private String scheduleName;

    @Column(nullable = false)
    private String scheduleCategory;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private int locationKey;

    @Builder
    public Schedule(User user, String scheduleName, String scheduleCategory, Weather weather, LocalDate date, int locationKey) {
        this.user = user;
        this.weather = weather;
        this.scheduleName = scheduleName;
        this.scheduleCategory = scheduleCategory;
        this.date = date;
        this.locationKey = locationKey;
    }
}
