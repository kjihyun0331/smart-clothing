package sueprtizen.smartclothing.domain.clothing.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sueprtizen.smartclothing.domain.clothing.entity.Style;

import java.util.List;
import java.util.Optional;

public interface StyleRepository extends JpaRepository<Style, Integer> {
    Optional<List<Style>> findAllByStyleNameIn(List<String> styleName);
}
