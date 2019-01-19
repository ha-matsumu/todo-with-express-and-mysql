const express = require("express");
const router = express.Router();
const apiController = require("./api.controller");

// routing用（api/todos）のmiddlewareの作成
// リクエスト（HTTPメソッド）、path、メソッド（callback関数）
router.get("/todos", apiController.getTodos);
router.post("/todos", apiController.postTodos);
router.put("/todos", apiController.putTodos);
router.delete("/todos", apiController.deleteTodos);

module.exports = router;
