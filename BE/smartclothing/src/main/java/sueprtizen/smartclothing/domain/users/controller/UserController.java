package sueprtizen.smartclothing.domain.users.controller;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sueprtizen.smartclothing.domain.users.dto.UserRequestDTO;
import sueprtizen.smartclothing.domain.users.dto.UserResponseDTO;
import sueprtizen.smartclothing.domain.users.service.UserService;
import sueprtizen.smartclothing.domain.users.service.UserServiceImpl;
import sueprtizen.smartclothing.global.dto.Message;

@RequestMapping("/users")
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("")
    public ResponseEntity<Message<UserResponseDTO>> signIn(@RequestBody @Valid UserRequestDTO userRequestDTO,
                                                           HttpServletResponse response) {
        UserResponseDTO signInResponse = userService.signIn(userRequestDTO);
        return ResponseEntity.ok().body(Message.success(signInResponse));
    }
}
