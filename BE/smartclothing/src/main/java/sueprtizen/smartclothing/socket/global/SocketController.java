package sueprtizen.smartclothing.socket.global;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import sueprtizen.smartclothing.domain.clothing.dto.SocketClothingImageDTO;
import sueprtizen.smartclothing.domain.clothing.dto.SocketClothingInfoDTO;
import sueprtizen.smartclothing.domain.clothing.service.ClothingService;
import sueprtizen.smartclothing.socket.clothes.dto.SocketUserResponseDTO;
import sueprtizen.smartclothing.socket.clothes.service.SocketUserService;
import sueprtizen.smartclothing.socket.machine.dto.AirdresserResponseDTO;
import sueprtizen.smartclothing.socket.machine.dto.WasherResponseDTO;
import sueprtizen.smartclothing.socket.machine.service.AirdresserService;
import sueprtizen.smartclothing.socket.machine.service.WasherService;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.List;

@Controller
public class SocketController {

    private ServerSocket serverSocket;
    private final ApplicationContext applicationContext;

    @Autowired
    public SocketController(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    public void start(int port) {
        try {
            serverSocket = new ServerSocket(port);
            while (!serverSocket.isClosed()) {
                Socket socket = serverSocket.accept();
                // 새로운 클라이언트 연결 처리
                new ClientHandler(socket, applicationContext).start();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void stop() {
        try {
            if (serverSocket != null) {
                serverSocket.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // 클라이언트 처리를 위한 별도의 스레드 클래스
    private static class ClientHandler extends Thread {
        private final Socket socket;
        private final ApplicationContext applicationContext;

        public ClientHandler(Socket socket, ApplicationContext applicationContext) {
            this.socket = socket;
            this.applicationContext = applicationContext;
        }

        @Override
        public void run() {

            JSONParser parser = new JSONParser();
            ObjectMapper objectMapper = new ObjectMapper();
            WasherService washerService = applicationContext.getBean(WasherService.class);
            SocketUserService userService = applicationContext.getBean(SocketUserService.class);
            ClothingService clothingService = applicationContext.getBean(ClothingService.class);
            AirdresserService airdresserService = applicationContext.getBean(AirdresserService.class);

            try {
                BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
                PrintWriter writer = new PrintWriter(new OutputStreamWriter(socket.getOutputStream()), true);

                String clientMessage;
                // 클라이언트로부터 한 줄의 문자열을 읽습니다.
                while ((clientMessage = reader.readLine()) != null) {
                    // 클라이언트가 "exit"를 보내면 연결을 종료합니다.
                    if ("exit".equalsIgnoreCase(clientMessage)) {
                        break;
                    }
                    writer.println("Request Accpeted");

                    JSONObject requestDTO = (JSONObject) parser.parse(clientMessage);
                    try {
                        String requestName = (String) requestDTO.get("requestName");
                        System.out.println(requestName.getClass().getName());
                        Long requestNumber = (Long) requestDTO.get("requestNumber");

                        JSONObject responseJson = new JSONObject();
                        responseJson.put("requestNumber", requestNumber);

                        switch (requestName) {
                            case "getMainLaundryList":
                                List<WasherResponseDTO> minLaundry = washerService.getMainLaundryList();
                                responseJson.put("count", minLaundry.size());
                                responseJson.put("result", objectMapper.writeValueAsString(minLaundry));
                                break;
                            case "getAllLaundryList":
                                List<WasherResponseDTO> laundry = washerService.getAllLaundryList();
                                responseJson.put("count", laundry.size());
                                responseJson.put("result", objectMapper.writeValueAsString(laundry));
                                break;
                            case "getMainOutfitList":
                                List<AirdresserResponseDTO> minOutfit = airdresserService.getMainOutfitList();
                                responseJson.put("count", minOutfit.size());
                                responseJson.put("result", objectMapper.writeValueAsString(minOutfit));
                                break;
                            case "getAllOutfitList":
                                List<AirdresserResponseDTO> outfit = airdresserService.getAllOutfitList();
                                responseJson.put("count", outfit.size());
                                responseJson.put("result", objectMapper.writeValueAsString(outfit));
                                break;
                            case "getUserList":
                                List<SocketUserResponseDTO> users = userService.getAllUsers();
                                responseJson.put("count", users.size());
                                responseJson.put("result", objectMapper.writeValueAsString(users));
                                break;
                            case "getClothesInfo":
                                SocketClothingInfoDTO info = clothingService.getClothingInfo((String)requestDTO.get("rfidUid"));
                                responseJson.put("result", objectMapper.writeValueAsString(info));
                                break;
                            case "getClothesImage":
                                SocketClothingImageDTO path = clothingService.getClothingImage((String) requestDTO.get("rfidUid"));
                                responseJson.put("result", objectMapper.writeValueAsString(path));
                                break;
                        }
                        writer.println(responseJson);
                    } catch (NullPointerException e) {
                        writer.println("Bad request");
                    }

                }
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                try {
                    socket.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }
}