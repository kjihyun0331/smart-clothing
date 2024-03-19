package sueprtizen.smartclothing.domain.clothing.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity
public class Clothing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private int clothingId;
    @Column(nullable = false)
    private int userId;
    @Column(nullable = false)
    private String clothingDetailId;
    @Column
    private String nowAt;
    @Column
    private String RFIDUid;
    @Column
    private String clothingName;
    @Column
    private String washedAt;
    @Column
    private String polluted;
    @Column
    private String wornCount;
    @Column
    private String category;
}
