package sueprtizen.smartclothing.domain.clothing.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@NoArgsConstructor
@Getter
@Entity
@ToString
public class Clothing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int clothingId;

    @OneToMany(mappedBy = "clothing")
    private List<UserClothing> userClothing;

    @ManyToOne
    @JoinColumn(name = "clothing_detail_id")
    private ClothingDetail clothingDetail;

    @OneToMany(mappedBy = "clothing")
    private List<ClothingStyle> clothingStyles;

    @Column
    private String nowAt;

    @Column(name = "RFID_uid")
    private String rfidUid;

    @Column
    private String washedAt;

    @Column
    private int polluted;

    @Column
    private String wornCount;

    @Column
    private String category;
}
