package sueprtizen.smartclothing.domain.clothing.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import sueprtizen.smartclothing.domain.users.entity.User;

@NoArgsConstructor
@Getter
@Entity
@ToString
public class UserClothing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private int clothingConnectionId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "clothing_id", nullable = false)
    private Clothing clothing;

    @Column(nullable = false)
    private String clothingName;

    @Column(nullable = false)
    private String accrueWornCount;
}
