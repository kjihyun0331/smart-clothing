package sueprtizen.smartclothing.domain.clothing.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sueprtizen.smartclothing.domain.clothing.dto.ClosetConfirmResponseDTO;
import sueprtizen.smartclothing.domain.clothing.dto.ClothingConfirmResponseDTO;
import sueprtizen.smartclothing.domain.clothing.dto.ClothingUpdateRequestDTO;
import sueprtizen.smartclothing.domain.clothing.entity.Clothing;
import sueprtizen.smartclothing.domain.clothing.entity.UserClothing;
import sueprtizen.smartclothing.domain.clothing.exception.ClothingErrorCode;
import sueprtizen.smartclothing.domain.clothing.exception.ClothingException;
import sueprtizen.smartclothing.domain.clothing.repository.ClothingRepository;
import sueprtizen.smartclothing.domain.clothing.repository.UserClothingRepository;
import sueprtizen.smartclothing.domain.users.entity.User;
import sueprtizen.smartclothing.domain.users.exception.UserErrorCode;
import sueprtizen.smartclothing.domain.users.exception.UserException;
import sueprtizen.smartclothing.domain.users.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClothingServiceImpl implements ClothingService {


    private final UserRepository userRepository;
    private final UserClothingRepository userClothingRepository;
    private final ClothingRepository clothingRepository;

    @Override
    public List<ClosetConfirmResponseDTO> closetConfirmation(int userId) {

        User currentUser = getUser(userId);

        List<UserClothing> allClothing = userClothingRepository.findAllByUser(currentUser);

        return allClothing.stream().map(userClothing ->
                ClosetConfirmResponseDTO.createFromUserClothing(userClothing.getClothing())
        ).toList();
    }

    @Override
    public ClothingConfirmResponseDTO clothingConfirmation(int userId, int clothingId) {

        User currentUser = getUser(userId);

        Clothing clothing = clothingRepository.findById(clothingId)
                .orElseThrow(() -> new ClothingException(ClothingErrorCode.CLOTHING_NOT_FOUND));

        UserClothing userClothing = userClothingRepository.findUserClothingByClothing(currentUser, clothing)
                .orElseThrow(() -> new ClothingException(ClothingErrorCode.CLOTHING_NOT_FOUND));

        return ClothingConfirmResponseDTO.createFromClothingUserClothingUser(clothing, userClothing);
    }

    @Override
    public Boolean removeClothing(int userId, int clothingId) {
        User currentUser = getUser(userId);

        Clothing clothing = clothingRepository.findById(clothingId)
                .orElseThrow(() -> new ClothingException(ClothingErrorCode.CLOTHING_NOT_FOUND));

        UserClothing userClothing = userClothingRepository.findUserClothingByClothing(currentUser, clothing)
                .orElseThrow(() -> new ClothingException(ClothingErrorCode.CLOTHING_NOT_FOUND));

        userClothingRepository.delete(userClothing);

        return true;
    }

    @Override
    @Transactional
    public Boolean updateClothing(int userId, ClothingUpdateRequestDTO clothingUpdateRequestDTO) {
        User currentUser = getUser(userId);

        Clothing clothing = clothingRepository.findById(clothingUpdateRequestDTO.clothingId())
                .orElseThrow(() -> new ClothingException(ClothingErrorCode.CLOTHING_NOT_FOUND));


        Clothing newClothing = new Clothing();

        UserClothing newUserClothing = new UserClothing();

        return null;
    }


    private User getUser(int userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new UserException(UserErrorCode.NOT_FOUND_MEMBER));
    }

}
