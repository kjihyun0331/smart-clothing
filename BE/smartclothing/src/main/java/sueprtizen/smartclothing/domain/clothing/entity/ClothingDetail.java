package sueprtizen.smartclothing.domain.clothing.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity
public class ClothingDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private int clothingDetailId;

    @Column(nullable = false)
    private String clothingImgPath;

    @Column
    private String color;

}
