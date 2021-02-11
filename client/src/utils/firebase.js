import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDQS8p9zc_6GoOb5Sqqjn3o_K1mf3lBsAg",
  authDomain: "parsitdemo.firebaseapp.com",
  databaseURL: "https://parsitdemo-default-rtdb.firebaseio.com",
  projectId: "parsitdemo",
  storageBucket: "parsitdemo.appspot.com",
  messagingSenderId: "810806059348",
  appId: "1:810806059348:web:c43021e2968e05325c28c1",
  measurementId: "G-53L25HZNT7",
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const fcm = firebase.messaging();
const db = firebase.firestore();
db.useEmulator("localhost", "8080");

export { firebase, db, fcm };
