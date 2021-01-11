const functions = require("firebase-functions");
const express = require("express");
const {
  getAllTodos,
  createTodo,
  deleteTodo,
  editTodo,
} = require("./APIs/todos");
const {
  loginUser,
  signUpUser,
  uploadProfilePhoto,
  getUser,
  editUser,
} = require("./APIs/users");
const auth = require("./utils/auth");

const app = express();

app.get("/todos", getAllTodos);
app.post("/todo", createTodo);
app.delete("/todo/:todoId", deleteTodo);
app.put("/todo/:todoId", editTodo);

app.post("/login", loginUser);
app.post("/signup", signUpUser);
app.post("/user/image", auth, uploadProfilePhoto);
app.get("/user", auth, getUser);
app.put("/user", auth, editUser);

exports.api = functions.https.onRequest(app);
