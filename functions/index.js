const functions = require("firebase-functions");
const express = require("express");
const { getAllTodos } = require("./APIs/todos");

const app = express();

app.get("/todos", getAllTodos);

exports.api = functions.https.onRequest(app);
