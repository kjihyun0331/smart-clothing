package sueprtizen.smartclothing.domain.family.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity
public class Family {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int familyId;

    @Column
    private int washerId;

    @Column
    private int airDresserId;
}
