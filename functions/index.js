const functions = require("firebase-functions");
const express = require("express");
const {
  getAllTodos,
  createTodo,
  deleteTodo,
  editTodo,
} = require("./APIs/todos");
const { loginUser, signUpUser, uploadProfilePhoto } = require("./APIs/users");
const auth = require("./utils/auth");

const app = express();

app.get("/todos", getAllTodos);
app.post("/todo", createTodo);
app.delete("/todo/:todoId", deleteTodo);
app.put("/todo/:todoId", editTodo);

app.post("/login", loginUser);
app.post("/signup", signUpUser);
app.post("/user/image", auth, uploadProfilePhoto);

exports.api = functions.https.onRequest(app);
