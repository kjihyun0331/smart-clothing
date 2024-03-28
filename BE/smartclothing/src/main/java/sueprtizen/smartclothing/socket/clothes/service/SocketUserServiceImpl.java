package sueprtizen.smartclothing.socket.clothes.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sueprtizen.smartclothing.domain.users.entity.User;
import sueprtizen.smartclothing.socket.clothes.dto.SocketUserResponseDTO;
import sueprtizen.smartclothing.socket.clothes.repository.SocketUserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SocketUserServiceImpl implements SocketUserService {
    private final SocketUserRepository userRepository;

    @Transactional(readOnly = true)
    public List<SocketUserResponseDTO> getAllUsers(){
        List<User> users = userRepository.findAll();
        return users.stream().map(entity -> SocketUserResponseDTO.builder()
                .userId(entity.getUserId())
                .userName(entity.getUserName())
                .build()
        ).collect(Collectors.toList());
    }
}
