package sueprtizen.smartclothing.domain.clothing.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
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
    private LocalDateTime locationModifiedAt;

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
    @Builder
    public Clothing(String rfidUid, ClothingDetail detail){
        this.rfidUid=rfidUid;
        this.clothingDetail=detail;
        this.category="없음";
        this.nowAt="옷장";
        this.washedAt=LocalDateTime.now().toString();
    }

    public void updateNowat(String machine){
        this.nowAt=machine;
    }
}
