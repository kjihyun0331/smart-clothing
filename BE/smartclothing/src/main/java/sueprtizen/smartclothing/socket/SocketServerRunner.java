package sueprtizen.smartclothing.socket;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class SocketServerRunner implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
        SocketServer server = new SocketServer();
        server.start(65432); // 65432 포트에서 서버 시작
    }
}
