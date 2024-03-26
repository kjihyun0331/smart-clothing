package sueprtizen.smartclothing.domain.calendar.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import sueprtizen.smartclothing.domain.users.entity.User;

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

    @Column(nullable = false)
    private String scheduleName;

    @Column(nullable = false)
    private String date;
}
