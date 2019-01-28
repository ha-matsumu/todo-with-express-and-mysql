const index = require("../models/index");

function throwErrorMessage() {
  this.message = "Not found";
  this.code = "404";
}

module.exports = {
  // 各リクエストに対して実行されるメソッドを定義
  async getTodos(req, res) {
    try {
      // select * from Todo order by id;
      const todos = await index.Todo.findAll({
        order: [["id", "ASC"]]
      });
      res.status(200).json(todos);
    } catch (error) {
      res.json(error);
    }
  },

  async postTodos(req, res) {
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
        { transaction }
      );
      await transaction.commit();
      res.status(200).json(todo);
    } catch (error) {
      await transaction.rollback();
      res.json(error);
    }
  },

  async getTodoById(req, res) {
    const targetTodoId = req.params.id;
    try {
      // select * from Todo order by id;
      const todo = await index.Todo.findById(Number(targetTodoId));

      // if(!todo){
      //   res.status(404).json({
      //     message: "Not Found",
      //     code: "404"
      //   });
      // }

      res.status(200).json(todo);
    } catch (error) {
      res.json(error);
    }
  },

  async putTodos(req, res) {
    const targetTodoId = req.params.id;
    let transaction;
    try {
      transaction = await index.sequelize.transaction();

      //update todos set title = "titleA", body = "bodyA", completed = true where id = selectID;
      const todo = await index.Todo.findById(Number(targetTodoId), {
        transaction
      });

      if (!todo) {
        throw new Error('{"message": "Not Found", "code": "404"}');
      }

      todo.update({
        title: req.body.title,
        body: req.body.body,
        completed: req.body.completed
      });

      await transaction.commit();
      res.status(200).json(todo);
    } catch (error) {
      await transaction.rollback();
      res.status(404).json(error.message);
    }
  },
  deleteTodos(req, res) {
    const id = req.params.id;
    const data = "delete todo of id " + id + " from DB";
    res.status(200).send(data);
  }
};
