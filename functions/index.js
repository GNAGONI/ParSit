const functions = require("firebase-functions");
const express = require("express");
const {
  getAllTodos,
  createTodo,
  deleteTodo,
  editTodo,
} = require("./APIs/todos");

const app = express();

app.get("/todos", getAllTodos);
app.post("/todo", createTodo);
app.delete("/todo/:todoId", deleteTodo);
app.put("/todo/:todoId", editTodo);

exports.api = functions.https.onRequest(app);
