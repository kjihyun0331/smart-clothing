package sueprtizen.smartclothing.domain.users.service;

import sueprtizen.smartclothing.domain.users.dto.UserRequestDTO;
import sueprtizen.smartclothing.domain.users.dto.UserResponseDTO;

public interface UserService {

    /**
     * 로그인을 처리하고, 로그인 응답 데이터를 반환합니다.
     *
     * @param userRequestDTO 로그인 요청 데이터
     * @return 로그인 응답 데이터
     */
    UserResponseDTO signIn(UserRequestDTO userRequestDTO);

}
