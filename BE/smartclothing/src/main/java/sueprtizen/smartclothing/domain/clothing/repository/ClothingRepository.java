package sueprtizen.smartclothing.domain.clothing.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sueprtizen.smartclothing.domain.clothing.entity.Clothing;

import java.util.List;

@Repository
public interface ClothingRepository extends JpaRepository<Clothing, Integer> {
    List<Clothing> findClothingByUser_UserId(int user_userId);
}
