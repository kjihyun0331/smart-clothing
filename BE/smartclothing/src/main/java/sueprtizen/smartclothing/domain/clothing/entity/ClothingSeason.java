package sueprtizen.smartclothing.domain.clothing.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity
public class ClothingSeason {
    @ManyToOne
    @JoinColumn(name = "clothing_id", nullable = false)
    Clothing clothing;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private int season_connection_id;
    @Column(nullable = false)
    private int month;
}
