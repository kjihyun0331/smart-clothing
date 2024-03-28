package sueprtizen.smartclothing.domain.users.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sueprtizen.smartclothing.domain.users.dto.UserDetailResponseDTO;
import sueprtizen.smartclothing.domain.users.dto.UserRequestDTO;
import sueprtizen.smartclothing.domain.users.dto.UserResponseDTO;
import sueprtizen.smartclothing.domain.users.service.UserService;
import sueprtizen.smartclothing.global.dto.Message;
import sueprtizen.smartclothing.global.fcm.FCMService;

@RequestMapping("/users")
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final FCMService fcmService;

    @Operation(summary = "로그인", description = "로그인을 처리하고, 로그인 응답 데이터를 반환합니다.")
    @PostMapping("")
    public ResponseEntity<Message<UserResponseDTO>> signIn(@RequestBody @Valid UserRequestDTO userRequestDTO,@RequestHeader("fcmToken") @Valid String token) {
        UserResponseDTO signInResponse = userService.signIn(userRequestDTO);
        fcmService.saveFCMToken(signInResponse.userId(),token);
        return ResponseEntity.ok(Message.success(signInResponse));
    }

    @Operation(summary = "유저 정보 조회", description = "유저의 나이와 성별을 반환합니다.")
    @GetMapping("")
    public ResponseEntity<Message<UserDetailResponseDTO>> getUserDetail(@RequestHeader("User-Id") @Valid int userId) {
        UserDetailResponseDTO userDetailResponse = userService.getUserDetail(userId);
        return ResponseEntity.ok(Message.success(userDetailResponse));
    }
}
