package sueprtizen.smartclothing.domain.weather.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import sueprtizen.smartclothing.domain.users.entity.User;

@NoArgsConstructor
@Getter
@Entity
public class Weather {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int scheduleId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String scheduleName;

    @Column(nullable = false)
    private String date;
}
