package sueprtizen.smartclothing.socket.clothes.service;

import sueprtizen.smartclothing.socket.clothes.dto.SocketUserResponseDTO;

import java.util.List;

public interface SocketUserService {
    List<SocketUserResponseDTO> getAllUsers();
}
