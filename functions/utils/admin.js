const admin = require("firebase-admin");

process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";

admin.initializeApp({
  projectId: "parsitdemo",
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();

module.exports = {
  admin,
  db,
};
