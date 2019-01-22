const assert = require("power-assert");
const requestHelper = require("../requestHelper");

describe("GET /api/todos", () => {
  it("API経由で取得したデータの確認", () => {
    return requestHelper
      .requestAPI("get", "/api/todos", 200)
      .set("Accept", "application/json")
      .then(response => {
        const todos = response.body;

        assert.equal(Array.isArray(todos), true, "配列ではありません。");
        todos.forEach((todo, index) => {
          // DBの各カラムのデータの確認
          assert.equal(todo.id, index + 1, "idが正しくありません。");
          assert.equal(
            typeof todo.title,
            "string",
            "titleは'string'型ではありません。"
          );
          assert.equal(
            typeof todo.body,
            "string",
            "bodyは'string'型ではありません。"
          );
          assert.equal(
            todo.completed,
            false,
            "completedは'false'ではありません。"
          );
          assert.equal(
            typeof todo.createdAt,
            "string",
            "createdAtは'string'型ではありません。"
          );
          assert.equal(
            typeof todo.updatedAt,
            "string",
            "updatedAtは'string'型ではありません。"
          );
        });
      });
  });
});
