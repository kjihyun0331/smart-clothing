package sueprtizen.smartclothing.domain.users.controller;

import jakarta.persistence.Column;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sueprtizen.smartclothing.domain.users.dto.UserRequest;
import sueprtizen.smartclothing.domain.users.entity.User;
import sueprtizen.smartclothing.domain.users.service.UserService;
import sueprtizen.smartclothing.global.BaseResponse;
import sueprtizen.smartclothing.global.DataResponse;

@RequestMapping("/users")
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    @PostMapping("")
    public BaseResponse select(@RequestBody @Valid UserRequest userRequest){
        User user = userService.select(userRequest);
        if(user!=null){
            return new DataResponse<>(user);
        }
        return new BaseResponse("일치하는 회원 정보가 없습니다. 사용자의 id와 비밀번호를 확인해주세요.");
    }
}
