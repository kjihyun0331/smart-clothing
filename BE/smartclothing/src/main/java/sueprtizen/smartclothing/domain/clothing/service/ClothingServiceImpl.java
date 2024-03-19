package sueprtizen.smartclothing.domain.clothing.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sueprtizen.smartclothing.domain.clothing.repository.ClothingRepository;

@Service
@RequiredArgsConstructor
public class ClothingServiceImpl implements ClothingService {
    private final ClothingRepository clothingRepository;
}
