import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

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
  } else {
    console.log("cant get token");
  }
});
