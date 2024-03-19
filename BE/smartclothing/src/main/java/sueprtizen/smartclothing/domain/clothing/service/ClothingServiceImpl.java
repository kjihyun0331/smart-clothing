package sueprtizen.smartclothing.domain.clothing.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sueprtizen.smartclothing.domain.clothing.dto.ClothingAllResponseDTO;
import sueprtizen.smartclothing.domain.clothing.repository.ClothingRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClothingServiceImpl implements ClothingService {
    private final ClothingRepository clothingRepository;

    @Override
    public List<ClothingAllResponseDTO> closetConfirmation(int userId) {

        return clothingRepository.findClothingByUser_UserId(userId)
                .stream()
                .map(clothing -> ClothingAllResponseDTO.builder()
                        .clothingId(clothing.getClothingId())
                        .clothingImagePath(clothing.getClothingDetail().getClothingImgPath())
                        .build()
                ).toList();
    }

}
