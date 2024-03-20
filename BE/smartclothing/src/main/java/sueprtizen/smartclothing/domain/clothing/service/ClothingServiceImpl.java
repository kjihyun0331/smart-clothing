package sueprtizen.smartclothing.domain.clothing.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sueprtizen.smartclothing.domain.clothing.dto.ClosetConfirmResponseDTO;
import sueprtizen.smartclothing.domain.clothing.repository.ClothingRepository;
import sueprtizen.smartclothing.domain.users.exception.UserErrorCode;
import sueprtizen.smartclothing.domain.users.exception.UserException;
import sueprtizen.smartclothing.domain.users.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClothingServiceImpl implements ClothingService {
    private final ClothingRepository clothingRepository;
    private final UserRepository userRepository;

    @Override
    public List<ClosetConfirmResponseDTO> closetConfirmation(int userId) {

        userRepository.findById(userId).orElseThrow(
                () -> new UserException(UserErrorCode.NOT_FOUND_MEMBER)
        );

        return clothingRepository.findClothingByUser_UserId(userId)
                .stream()
                .map(clothing -> ClosetConfirmResponseDTO.builder()
                        .clothingId(clothing.getClothingId())
                        .clothingImagePath(clothing.getClothingDetail().getClothingImgPath())
                        .build()
                ).toList();
    }

}
