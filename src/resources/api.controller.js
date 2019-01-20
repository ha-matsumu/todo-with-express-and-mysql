const Todo = require("../models/index").Todo;

module.exports = {
  // 各リクエストに対して実行されるメソッドを定義
  async getTodos(req, res) {
    // select * from Todo order by id;
    const todos = await Todo.findAll({
      order: [["id", "ASC"]]
    });

    res.status(200).send(todos);
  },
  postTodos(req, res) {
    res.status(200).send("create todo to DB");
  },
  putTodos(req, res) {
    const id = req.params.id;
    const data = "update todo of id " + id + " in DB";
    res.status(200).send(data);
  },
  deleteTodos(req, res) {
    const id = req.params.id;
    const data = "delete todo of id " + id + " from DB";
    res.status(200).send(data);
  }
};
