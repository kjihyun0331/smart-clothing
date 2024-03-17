package sueprtizen.smartclothing.domain.users.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sueprtizen.smartclothing.domain.users.dto.UserRequest;
import sueprtizen.smartclothing.domain.users.entity.User;
import sueprtizen.smartclothing.domain.users.repository.UserRepository;


@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User select(UserRequest userRequest){
        User user = userRepository.findUserByEmailAndPassword(userRequest.getEmail(),userRequest.getPassword());
        return user;
    }
}
