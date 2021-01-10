const { db } = require("../utils/admin");

const getAllTodos = (request, response) => {
  db.collection("todos")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let todos = [];
      data.forEach((doc) => {
        todos.push({
          todoId: doc.id,
          title: doc.data().title,
          body: doc.data().body,
          createdAt: doc.data().createdAt,
        });
      });
      return response.json(todos);
    })
    .catch((e) => {
      console.error(e);
      return response.status(500).json({ message: e.code });
    });
};

const createTodo = (request, response) => {
  if (!request.body.body || request.body.body.trim() === "") {
    return response.status(400).json({ body: "Must not be empty" });
  }
  if (!request.body.title || request.body.title.trim() === "") {
    return response.status(400).json({ title: "Must not be empty" });
  }
  const todo = {
    title: request.body.title,
    body: request.body.body,
    createdAt: new Date().toISOString(),
  };

  db.collection("todos")
    .add(todo)
    .then((doc) => {
      const responseTodo = todo;
      responseTodo.id = doc.id;
      return response.json(responseTodo);
    })
    .catch((e) => {
      console.error(e);
      return response.status(500).json({ message: "Failed to create a todo" });
    });
};

const deleteTodo = (request, response) => {
  const todoId = request.params.todoId;
  if (!todoId) {
    return response.status(400).json({ message: "Toto id is not provided" });
  }
  const document = db.doc(`/todos/${todoId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({ message: "Todo not found" });
      }
      return document.delete();
    })
    .then(() => {
      return response.json({ message: "Delete successfull" });
    })
    .catch((e) => {
      console.error(e);
      return response.status(500).json({ message: "Delete failed" });
    });
};

const editTodo = (request, response) => {
  const todoId = request.params.todoId;
  if (!todoId) {
    return response.status(400).json({ message: "Toto id is not provided" });
  }
  if (request.body.todoId || request.body.createdAt) {
    return response.status(403).json({ message: "Not allowed to edit" });
  }
  if (!request.body.title && !request.body.body) {
    return response
      .status(400)
      .json({ message: "There are no fields to update in todo" });
  }
  const document = db.doc(`/todos/${todoId}`);
  document
    .update(request.body)
    .then(() => {
      return response.json({ message: "Updated successfully" });
    })
    .catch((e) => {
      console.error(e);
      return response.status(500).json({ message: "Update failed" });
    });
};

module.exports = {
  getAllTodos,
  createTodo,
  deleteTodo,
  editTodo,
};
