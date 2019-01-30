const index = require("../models/index");

const throwClientError = () => {
  const error = new Error();
  error.message = "Not Found";
  error.code = 404;
  throw error;
};
const serverError = {
  message: "Server Error",
  code: 500
};

module.exports = {
  // 各リクエストに対して実行されるメソッドを定義
  async getTodos(req, res) {
    try {
      // select * from Todo order by id;
      const todos = await index.Todo.findAll({
        order: [["id", "ASC"]]
      });

      if (!todos) {
        throwClientError();
      }

      res.status(200).json(todos);
    } catch (error) {
      if (error.code === 404) {
        res.status(error.code).json(error);
      } else {
        res.status(serverError.code).json(serverError.message);
      }
    }
  },

  async postTodo(req, res) {
    let transaction;
    try {
      transaction = await index.sequelize.transaction();

      // inset into Todo(title, body) values(value1, value2);
      const todo = await index.Todo.create(
        {
          title: req.body.title,
          body: req.body.body,
          completed: req.body.completed
        },
        transaction
      );

      if (!todo) {
        throwClientError();
      }

      await transaction.commit();
      res.status(200).json(todo);
    } catch (error) {
      await transaction.rollback();
      if (error.code === 404) {
        res.status(error.code).json(error);
      } else {
        res.status(serverError.code).json(serverError.message);
      }
    }
  },

  async getTodoById(req, res) {
    const targetTodoId = req.params.id;
    try {
      // select * from Todo order by id;
      const todo = await index.Todo.findById(Number(targetTodoId));

      if (!todo) {
        throwClientError();
      }

      res.status(200).json(todo);
    } catch (error) {
      if (error.code === 404) {
        res.status(error.code).json(error);
      } else {
        res.status(serverError.code).json(serverError.message);
      }
    }
  },

  async putTodo(req, res) {
    const targetTodoId = req.params.id;
    let transaction;
    try {
      transaction = await index.sequelize.transaction();

      //update todos set title = "titleA", body = "bodyA", completed = true where id = targetTodoId;
      const todo = await index.Todo.findById(Number(targetTodoId), {
        transaction
      });

      if (!todo) {
        throwClientError();
      }

      todo.update(
        {
          title: req.body.title,
          body: req.body.body,
          completed: req.body.completed
        },
        transaction
      );

      await transaction.commit();
      res.status(200).json(todo);
    } catch (error) {
      await transaction.rollback();
      if (error.code === 404) {
        res.status(error.code).json(error);
      } else {
        res.status(serverError.code).json(serverError.message);
      }
    }
  },

  async deleteTodo(req, res) {
    const targetTodoId = req.params.id;
    let transaction;
    try {
      transaction = await index.sequelize.transaction();

      //delete from todos where id = targetTodoId;
      const todo = await index.Todo.findById(Number(targetTodoId), {
        transaction
      });

      if (!todo) {
        throwClientError();
      }

      todo.destroy(transaction);

      await transaction.commit();
      res.status(200).json(todo);
    } catch (error) {
      await transaction.rollback();
      if (error.code === 404) {
        res.status(error.code).json(error);
      } else {
        res.status(serverError.code).json(serverError.message);
      }
    }
  }
};
