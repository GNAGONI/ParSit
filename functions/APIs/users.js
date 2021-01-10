const firebase = require("firebase");
const { admin, db } = require("../utils/admin");
const config = require("../utils/config");
const {
  validateLoginData,
  validateSignUpData,
} = require("../utils/validators");

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

const loginUser = (request, response) => {
  const user = {
    email: request.body.email,
    password: request.body.password,
  };

  const { valid, errors } = validateLoginData(user);
  if (!valid) {
    return response.status(400).json(errors);
  }

  auth
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return response.json({ token });
    })
    .catch((e) => {
      console.error(e);
      return response.status(403).json({ message: "Login failed" });
    });
};

const signUpUser = (request, response) => {
  const newUser = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    phoneNumber: request.body.phoneNumber,
    country: request.body.country,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
    username: request.body.username,
  };

  const { valid, errors } = validateSignUpData(newUser);
  if (!valid) return response.status(400).json(errors);

  let token = null;
  let userId = null;

  db.doc(`/users/${newUser.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return response
          .status(400)
          .json({ username: "The username is already taken" });
      } else {
        return auth.createUserWithEmailAndPassword(
          newUser.email,
          newUser.password
        );
      }
    })
    .then((userData) => {
      userId = userData.user.uid;
      token = userData.user.getIdToken();
      return {
        userId,
        token,
      };
    })
    .then(({ userId }) => {
      const userCredentials = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        phoneNumber: newUser.phoneNumber,
        country: newUser.country,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId,
      };
      return db.doc(`/users/${newUser.username}`).set(userCredentials);
    })
    .then(() => {
      return response.status(200).json({ token: token.h });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return response.status(400).json({ email: "Email already in use" });
      } else {
        return response
          .status(500)
          .json({ general: "Something went wrong, please try again" });
      }
    });
};

module.exports = {
  loginUser,
  signUpUser,
};
