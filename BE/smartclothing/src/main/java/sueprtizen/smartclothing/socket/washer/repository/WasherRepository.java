package sueprtizen.smartclothing.socket.washer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sueprtizen.smartclothing.domain.clothing.entity.Clothing;
import sueprtizen.smartclothing.domain.clothing.entity.UserClothing;

import java.util.Optional;

@Repository
public interface WasherRepository extends JpaRepository<Clothing, Integer> {
    Optional<Clothing> findAllByNowAt(String place);
}
