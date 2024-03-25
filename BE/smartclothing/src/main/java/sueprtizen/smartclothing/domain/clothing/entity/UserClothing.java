package sueprtizen.smartclothing.domain.clothing.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import sueprtizen.smartclothing.domain.users.entity.User;

import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "userClothing")
    private List<ClothingSeason> clothingSeasonList = new ArrayList<>();

    @Column(nullable = false)
    private String clothingName;

    @Column(nullable = false)
    private String accrueWornCount;


    public void updateUserClothing(String clothingName, Clothing clothing, List<ClothingSeason> clothingSeasonList) {
        this.clothingName = clothingName;
        this.clothing = clothing;
        this.clothingSeasonList = clothingSeasonList;
    }

}
