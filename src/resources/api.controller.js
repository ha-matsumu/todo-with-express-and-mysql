module.exports = {
  // 各リクエストに対して実行されるメソッドを定義
  getTodos(req, res) {
    res.status(200).send("get todos from DB");
  },
  postTodos(req, res) {
    res.status(200).send("create todo to DB");
  },
  putTodos(req, res) {
    res.status(200).send("update todo in DB");
  },
  deleteTodos(req, res) {
    res.status(200).send("delete todo from DB");
  }
}