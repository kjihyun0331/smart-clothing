package sueprtizen.smartclothing.global.fcm;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import java.io.FileInputStream;

public class FirbaseInitializer {

    public static void initialize() {
        if (FirebaseApp.getApps().isEmpty()) {
            try {
                FileInputStream serviceAccount = new FileInputStream("C:\\Users\\SSAFY\\Desktop\\superTizen\\S10P21S006\\BE\\smartclothing\\src\\main\\java\\sueprtizen\\smartclothing\\global\\fcm\\smartclothing-6d964-c06778ad8dcd.json");

                FirebaseOptions options = new FirebaseOptions.Builder()
                        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                        .build();

                FirebaseApp.initializeApp(options);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
