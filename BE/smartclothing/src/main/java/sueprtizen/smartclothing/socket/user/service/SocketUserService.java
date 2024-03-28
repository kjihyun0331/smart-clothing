package sueprtizen.smartclothing.socket.user.service;

import sueprtizen.smartclothing.socket.user.dto.SocketUserResponseDTO;

import java.util.List;

public interface SocketUserService {
    List<SocketUserResponseDTO> getAllUsers();
}
