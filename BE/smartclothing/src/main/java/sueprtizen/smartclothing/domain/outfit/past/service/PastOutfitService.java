package sueprtizen.smartclothing.domain.outfit.past.service;

import sueprtizen.smartclothing.domain.outfit.past.dto.TodayClothingDTO;

import java.util.List;

public interface PastOutfitService {

    List<TodayClothingDTO> todayOutfitsConfirmation(int userId);
}
