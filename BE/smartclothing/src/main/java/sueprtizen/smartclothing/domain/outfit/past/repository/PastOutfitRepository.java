package sueprtizen.smartclothing.domain.outfit.past.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sueprtizen.smartclothing.domain.outfit.past.entity.PastOutfit;

@Repository
public interface PastOutfitRepository extends JpaRepository<PastOutfit, Integer> {
}
