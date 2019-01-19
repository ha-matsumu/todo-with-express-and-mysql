const express = require("express");
const router = express.Router();
const apiController = require("./api.controller");

// routing用（api/todos）のmiddlewareの作成
// リクエスト（HTTPメソッド）、path、メソッド（callback関数）
router.route("/todos/:id")
  .get(apiController.getTodos)
  .post(apiController.postTodos)
  .put(apiController.putTodos)
  .delete(apiController.deleteTodos);

module.exports = router;
