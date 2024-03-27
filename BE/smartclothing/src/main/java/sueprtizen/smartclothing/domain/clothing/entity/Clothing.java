package sueprtizen.smartclothing.domain.clothing.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@NoArgsConstructor
@Getter
@Entity

public class Clothing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int clothingId;

    @OneToMany(mappedBy = "clothing",fetch = FetchType.EAGER)
    private List<UserClothing> userClothing;

    @ManyToOne
    @JoinColumn(name = "clothing_detail_id")
    private ClothingDetail clothingDetail;

    @OneToMany(mappedBy = "clothing",fetch = FetchType.EAGER)
    private List<ClothingStyle> clothingStyleList;

    @Column
    private int ownerId;

    @Column
    private String nowAt;

    @Column(name = "RFID_uid")
    private String rfidUid;

    @Column
    private String washedAt;

    @Column
    private int polluted;

    @Column
    private int wornCount;

    @Column
    private String category;

    public void updateClothing(List<ClothingStyle> clothingStyleList, String category) {
        this.clothingStyleList = clothingStyleList;
        this.category = category;
    }
}
