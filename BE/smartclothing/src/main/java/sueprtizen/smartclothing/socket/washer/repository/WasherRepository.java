package sueprtizen.smartclothing.socket.washer.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import sueprtizen.smartclothing.domain.clothing.entity.Clothing;

import java.util.List;

@Repository
public interface WasherRepository extends JpaRepository<Clothing,Integer> {

    List<Clothing> findAllByNowAt(String location);
}
