package sueprtizen.smartclothing.domain.clothing.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Entity
public class Texture {
    @Id
    @Column(nullable = false)
    private int textureId;

    @Column(nullable = false)
    private String textureName;

    @OneToMany(mappedBy = "texture")
    private List<ClothingTexture> clothingTextures = new ArrayList<>();

}
