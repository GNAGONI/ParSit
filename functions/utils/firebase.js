const firebase = require("firebase");
const config = require("./config");

firebase.initializeApp(config);

const functions = firebase.functions();
const firestore = firebase.firestore();
const database = firebase.database();
const auth = firebase.auth();

const isDev = true;
if (isDev) {
  functions.useEmulator("localhost", 5001);
  firestore.useEmulator("localhost", 8080);
  database.useEmulator("localhost", 9000);
  auth.useEmulator("http://localhost:9099");
}

module.exports = {
  auth,
};
