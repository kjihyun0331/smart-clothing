// /public/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

self.addEventListener("install", function (e) {
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm service worker가 실행되었습니다.");
});

const firebaseConfig = {
  apiKey: "AIzaSyAX5dTw8B5y4lPSsHrhSwTyyrMLrib_rjA",
  authDomain: "smartclothing-6d964.firebaseapp.com",
  projectId: "smartclothing-6d964",
  storageBucket: "smartclothing-6d964.appspot.com",
  messagingSenderId: "75126210766",
  appId: "1:75126210766:web:c1672e5eafaaea2736d09f",
  measurementId: "G-CXPQ0KX5CN",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.title;
  const notificationOptions = {
    body: payload.body,
    // icon: payload.icon
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
