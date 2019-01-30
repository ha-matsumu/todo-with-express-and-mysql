const index = require("../models/index");

const throwError = (errorMessage, errorCode) => {
  const error = new Error();
  error.message = errorMessage;
  error.code = errorCode;
  throw error;
};

module.exports = {
  // 各リクエストに対して実行されるメソッドを定義
  async getTodos(req, res) {
    try {
      // select * from Todo order by id;
      const todos = await index.Todo.findAll({
        order: [["id", "ASC"]]
      }).catch(error => {
        throwError("Server Error", 500);
      });

      if (!todos) {
        throwError("Not Found", 404);
      }

      res.status(200).json(todos);
    } catch (error) {
      res.status(error.code).json(error);
    }
  },

  async postTodo(req, res) {
    let transaction = await index.sequelize.transaction();
    try {
      // inset into Todo(title, body) values(value1, value2);
      const todo = await index.Todo.create(
        {
          title: req.body.title,
          body: req.body.body,
          completed: req.body.completed
        },
        transaction
      ).catch(error => {
        throwError("Server Error", 500);
      });

      await transaction.commit();
      res.status(200).json(todo);
    } catch (error) {
      await transaction.rollback();
      res.status(error.code).json(error);
    }
  },

  async getTodoById(req, res) {
    const targetTodoId = req.params.id;
    try {
      // select * from Todo order by id;
      const todo = await index.Todo.findById(Number(targetTodoId)).catch(
        error => {
          throwError("Server Error", 500);
        }
      );

      if (!todo) {
        throwError("Not Found", 404);
      }

      res.status(200).json(todo);
    } catch (error) {
      res.status(error.code).json(error);
    }
  },

  async putTodo(req, res) {
    const targetTodoId = req.params.id;
    let transaction = await index.sequelize.transaction();
    try {
      //update todos set title = "titleA", body = "bodyA", completed = true where id = targetTodoId;
      const todo = await index.Todo.findById(Number(targetTodoId), {
        transaction
      }).catch(error => {
        throwError("Server Error", 500);
      });

      if (!todo) {
        throwError("Not Found", 404);
      }

      todo
        .update(
          {
            title: req.body.title,
            body: req.body.body,
            completed: req.body.completed
          },
          transaction
        )
        .catch(error => {
          throwError("Server Error", 500);
        });

      await transaction.commit();
      res.status(200).json(todo);
    } catch (error) {
      await transaction.rollback();
      res.status(error.code).json(error);
    }
  },

  async deleteTodo(req, res) {
    const targetTodoId = req.params.id;
    let transaction = await index.sequelize.transaction();
    try {
      //delete from todos where id = targetTodoId;
      const todo = await index.Todo.findById(Number(targetTodoId), {
        transaction
      }).catch(error => {
        throwError("Server Error", 500);
      });

      if (!todo) {
        throwError("Not Found", 404);
      }

      await todo.destroy({ transaction }).catch(error => {
        throwError("Server Error", 500);
      });

      await transaction.commit();
      res.status(200).json(todo);
    } catch (error) {
      await transaction.rollback();
      res.status(error.code).json(error);
    }
  }
};
