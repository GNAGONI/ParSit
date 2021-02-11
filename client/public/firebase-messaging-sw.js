importScripts("https://www.gstatic.com/firebasejs/8.2.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.2/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyDQS8p9zc_6GoOb5Sqqjn3o_K1mf3lBsAg",
  authDomain: "parsitdemo.firebaseapp.com",
  databaseURL: "https://parsitdemo-default-rtdb.firebaseio.com",
  projectId: "parsitdemo",
  storageBucket: "parsitdemo.appspot.com",
  messagingSenderId: "810806059348",
  appId: "1:810806059348:web:c43021e2968e05325c28c1",
  measurementId: "G-53L25HZNT7",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
