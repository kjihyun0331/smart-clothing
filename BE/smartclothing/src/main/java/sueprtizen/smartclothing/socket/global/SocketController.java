package sueprtizen.smartclothing.socket.global;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Service;
import sueprtizen.smartclothing.socket.washer.service.AllLaundryList;
import sueprtizen.smartclothing.socket.washer.service.MainLaundryList;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class SocketController {

    private ServerSocket serverSocket;
    private static final Map<String, SocketService> serviceMap = new HashMap<>();

    static {
        serviceMap.put("getMainLaundryList", new MainLaundryList());
        serviceMap.put("getAllLaundryList", new AllLaundryList());
    }


    public void start(int port) {
        try {
            serverSocket = new ServerSocket(port);
            while (!serverSocket.isClosed()) {
                Socket socket = serverSocket.accept();
                // 새로운 클라이언트 연결 처리
                new ClientHandler(socket).start();
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
        private Socket socket;

        public ClientHandler(Socket socket) {
            this.socket = socket;
        }

        @Override
        public void run() {

            JSONParser parser = new JSONParser();

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

                    JSONObject requestDTO = (JSONObject) parser.parse(clientMessage);
                    String requestName = (String) requestDTO.get("requestName");

                    SocketService requestService = serviceMap.get(requestName);
                    if (requestService != null) {
                        ResponseDTO<Optional> responseDTO = requestService.execute(requestDTO);
                        writer.println(responseDTO);
                    } else {
                        System.out.println("No strategy found for requestName: " + requestName);
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