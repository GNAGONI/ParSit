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

module.exports = {
  getAllTodos,
};
