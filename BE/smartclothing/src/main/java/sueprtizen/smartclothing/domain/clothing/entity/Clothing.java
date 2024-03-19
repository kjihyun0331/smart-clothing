package sueprtizen.smartclothing.domain.clothing.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import sueprtizen.smartclothing.domain.users.entity.User;

@NoArgsConstructor
@Getter
@Entity
public class Clothing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int clothingId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "clothing_detail_id")
    private ClothingDetail clothingDetail;

    @Column
    private String nowAt;

    @Column(name = "RFID_uid")
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
