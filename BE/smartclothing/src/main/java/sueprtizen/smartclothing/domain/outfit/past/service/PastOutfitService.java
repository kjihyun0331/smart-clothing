package sueprtizen.smartclothing.domain.outfit.past.service;

import sueprtizen.smartclothing.domain.outfit.past.dto.PastOutFitResponseDTO;

import java.util.List;

public interface PastOutfitService {
    List<PastOutFitResponseDTO> pastOutfitsConfirmation(int userId);
}
