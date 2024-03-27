package sueprtizen.smartclothing.domain.outfit.recommended.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sueprtizen.smartclothing.domain.outfit.recommended.entity.RecommendedOutfit;

@Repository
public interface RecommendedOutfitRepository extends JpaRepository<RecommendedOutfit, Integer> {
}
