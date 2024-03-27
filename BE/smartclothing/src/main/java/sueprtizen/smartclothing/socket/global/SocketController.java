package sueprtizen.smartclothing.socket.global;

import jakarta.transaction.Transactional;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import sueprtizen.smartclothing.domain.clothing.entity.Clothing;
import sueprtizen.smartclothing.socket.washer.service.WasherService;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.List;

@Controller
public class SocketController {

    private ServerSocket serverSocket;
    private final ApplicationContext applicationContext;

    @Autowired
    public SocketController(ApplicationContext applicationContext){
        this.applicationContext=applicationContext;
    }

    public void start(int port) {
        try {
            serverSocket = new ServerSocket(port);
            while (!serverSocket.isClosed()) {
                Socket socket = serverSocket.accept();
                // 새로운 클라이언트 연결 처리
                new ClientHandler(socket,applicationContext).start();
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

        public ClientHandler(Socket socket,ApplicationContext applicationContext) {
            this.socket = socket;
            this.applicationContext=applicationContext;
        }

        @Override
        public void run() {

            JSONParser parser = new JSONParser();
            WasherService washerService = applicationContext.getBean(WasherService.class);

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
                    Long requestNumber = (Long) requestDTO.get("requestNumber");

                    JSONObject responseJson = new JSONObject();
                    responseJson.put("requestNumber",requestNumber);

                    switch (requestName){
                        case "getAllLaundryList":
                            List<Clothing> laundry = washerService.getAllLaundryList();
                            responseJson.put("count",laundry.size());
                            responseJson.put("result",laundry);

                            writer.println(responseJson);
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