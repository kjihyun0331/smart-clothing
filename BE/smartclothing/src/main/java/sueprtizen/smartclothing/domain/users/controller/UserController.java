package sueprtizen.smartclothing.domain.users.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sueprtizen.smartclothing.domain.users.dto.UserDetailResponseDTO;
import sueprtizen.smartclothing.domain.users.dto.UserRequestDTO;
import sueprtizen.smartclothing.domain.users.dto.UserResponseDTO;
import sueprtizen.smartclothing.domain.users.service.UserService;
import sueprtizen.smartclothing.global.dto.Message;

@RequestMapping("/users")
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("")
    public ResponseEntity<Message<UserResponseDTO>> signIn(@RequestBody @Valid UserRequestDTO userRequestDTO) {
        UserResponseDTO signInResponse = userService.signIn(userRequestDTO);
        return ResponseEntity.ok(Message.success(signInResponse));
    }

    @GetMapping("")
    public ResponseEntity<Message<UserDetailResponseDTO>> getUserDetail(@RequestHeader("User-Id") @Valid int userId) {
        UserDetailResponseDTO userDetailResponse = userService.getUserDetail(userId);
        return ResponseEntity.ok(Message.success(userDetailResponse));
    }
}
