const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
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
const {
  getAllCustomers,
  createCustomerWithFundingSource,
  createTransfer,
  verifyFundingSource,
  updateCustomer,
  updateFundingSource,
} = require("./APIs/payments");
const { sendMessage } = require("./APIs/messages");
const auth = require("./utils/auth");

const app = express();

app.use(cors());
app.get("/todos", auth, getAllTodos);
app.post("/todo", auth, createTodo);
app.delete("/todo/:todoId", auth, deleteTodo);
app.put("/todo/:todoId", auth, editTodo);

app.post("/login", loginUser);
app.post("/signup", signUpUser);
app.post("/user/image", auth, uploadProfilePhoto);
app.get("/user", auth, getUser);
app.put("/user", auth, editUser);

app.get("/payment/customers", getAllCustomers);
app.post("/payment/create-customer", createCustomerWithFundingSource);
app.post("/payment/update-customer", updateCustomer);
app.post("/payment/create-transfer", createTransfer);
app.post("/payment/verify-funding-source", verifyFundingSource);
app.post("/payment/update-funding-source", updateFundingSource);

app.post("/messaging/send-message", sendMessage);

exports.api = functions.https.onRequest(app);
