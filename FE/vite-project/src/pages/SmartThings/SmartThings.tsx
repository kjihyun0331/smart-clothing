import {
  Container,
  Title,
  Plus,
  ClothingCare,
} from "@/pages/SmartThings/smartStyle";
import SmartBottomNavbar from "@/components/smartbottomnavbar";
import image from "@/assets/homeclothingcare.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { registerServiceWorker } from "@/registerServiceWorker";
import axios from "axios";
import { BASE_URL } from "@/config/config";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyAX5dTw8B5y4lPSsHrhSwTyyrMLrib_rjA",
  authDomain: "smartclothing-6d964.firebaseapp.com",
  projectId: "smartclothing-6d964",
  storageBucket: "smartclothing-6d964.appspot.com",
  messagingSenderId: "75126210766",
  appId: "1:75126210766:web:c1672e5eafaaea2736d09f",
  measurementId: "G-CXPQ0KX5CN",
};

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);

      // Initialize Firebase Cloud Messaging and get a reference to the service
      const messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey:
          "BAvKNpOFBUcGQgfMg7mJV5eEzLVomA0XLUxAKAQOue4bTD0X9m0SkhG5RBy-PiuayPH0-Du2APzhRDTjfFAl0eA",
      }).then((currenttoken) => {
        if (currenttoken) {
          console.log("current token", currenttoken);
          localStorage.setItem("FCMtoken", currenttoken);
          const userToken = localStorage.getItem("token");
          console.log("user token", userToken);
          const data = {
            token: localStorage.getItem("FCMtoken"),
          };

          try {
            axios({
              method: "post",
              url: `${BASE_URL}/notifications`,
              headers: {
                "User-ID": userToken,
              },
              data: data,
            }).then((res) => res.data);
            console.log("token post 성공");
          } catch (error) {
            console.log("token post 실패", error);
          }
        } else {
          console.log("cant get token");
        }
      });
      registerServiceWorker();

      onMessage(messaging, (payload) => {
        // console.log("알림 도착 ", payload);
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
          body: payload.notification.body,
        };

        if (notificationTitle.length > 0 && notificationTitle != undefined) {
          if (Notification.permission === "granted") {
            new Notification(notificationTitle, notificationOptions);
          }
        }
      });
    } else {
      console.log("permission denied");
    }
  });
}

requestPermission();

function SmartThings() {
  const navigate = useNavigate();
  useEffect(() => {
    // 페이지나 컴포넌트가 마운트될 때 색상을 변경
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute("content", "#648FBA");

    // 컴포넌트가 언마운트될 때 원래 색상으로 복원(선택적)
    return () => {
      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute("content", "#ffffff");
    };
  }, []);

  return (
    <Container>
      <Title>SmartThings</Title>
      <Plus>+</Plus>
      <ClothingCare
        onClick={() => {
          navigate("/agreement");
        }}
      >
        <img src={image} alt="" />
      </ClothingCare>
      <SmartBottomNavbar />
    </Container>
  );
}

export default SmartThings;
