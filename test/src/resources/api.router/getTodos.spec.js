const assert = require("power-assert");
const requestHelper = require("../requestHelper");
const todoFactory = require("../../factories/todo");
const truncate = require("../../truncate");

describe("GET /api/todos", () => {
  before(async () => {
    const promises = [];
    for (let i = 0; i < 5; i++) {
      promises.push(todoFactory());
    }
    await Promise.all(promises);
  });

  after(async () => {
    await truncate();
  });

  it("API経由で取得したデータの確認", () => {
    return requestHelper
      .requestAPI("get", "/api/todos", 200)
      .set("Accept", "application/json")
      .then(response => {
        const todos = response.body;

        assert.equal(Array.isArray(todos), true, "配列ではありません。");
        todos.forEach((todo, index) => {
          // DBの各カラムの型チェックの確認
          assert.equal(
            typeof todo.id,
            "number",
            "idは'number'型ではありません。"
          );
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
            typeof todo.completed,
            "boolean",
            "completedは'boolean'型ではありません。"
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
