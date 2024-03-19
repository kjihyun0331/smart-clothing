package sueprtizen.smartclothing.domain.clothing.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sueprtizen.smartclothing.domain.clothing.service.ClothingService;

@RequestMapping("/clothing")
@RestController
@RequiredArgsConstructor
public class ClothingController {
    private final ClothingService clothingService;
}
