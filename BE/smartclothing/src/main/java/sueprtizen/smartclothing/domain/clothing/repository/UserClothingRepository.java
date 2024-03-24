package sueprtizen.smartclothing.domain.clothing.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sueprtizen.smartclothing.domain.clothing.entity.Clothing;
import sueprtizen.smartclothing.domain.clothing.entity.UserClothing;
import sueprtizen.smartclothing.domain.users.entity.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserClothingRepository extends JpaRepository<UserClothing, Integer> {

    List<UserClothing> findAllByUser(User user);

    @Query("select uc from UserClothing uc where uc.user = ?1 and uc.clothing = ?2")
    Optional<UserClothing> findUserClothingByClothing(User user, Clothing clothing);

    @Query("update UserClothing uc set uc.clothing = :clothing where uc.user.userId = :userId")
    int updateUserClothingById(@Param("userId") int userId, @Param("clothing") Clothing clothing);
}
