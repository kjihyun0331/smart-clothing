package sueprtizen.smartclothing.domain.clothing.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sueprtizen.smartclothing.domain.clothing.entity.Clothing;
import sueprtizen.smartclothing.domain.clothing.entity.ClothingStyle;

public interface ClothingStyleRepository extends JpaRepository<ClothingStyle, Integer>{

    void deleteAllByClothing(Clothing clothing);
}
