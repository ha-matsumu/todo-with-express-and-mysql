const express = require("express");
const router = express.Router();
const apiController = require("./api.controller");

// routing用（api/todos）のmiddlewareの作成
// リクエスト（HTTPメソッド）、path、メソッド（callback関数）
router.route("/todos")
  .get(apiController.getTodos)
  .post(apiController.postTodo);
router.route("/todos/:id")
  .get(apiController.getTodoById)
  .put(apiController.putTodo)
  .delete(apiController.deleteTodo);

module.exports = router;