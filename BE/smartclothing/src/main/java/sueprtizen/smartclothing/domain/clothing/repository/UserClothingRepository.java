package sueprtizen.smartclothing.domain.clothing.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sueprtizen.smartclothing.domain.clothing.entity.UserClothing;
import sueprtizen.smartclothing.domain.users.entity.User;

import java.util.List;

@Repository
public interface UserClothingRepository extends JpaRepository<UserClothing, Integer> {

    List<UserClothing> findAllByUser(User user);
}
