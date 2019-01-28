const assert = require("power-assert");
const requestHelper = require("../requestHelper");
const todoFactory = require("../../factories/todo");
const truncate = require("../../truncate");
const Todo = require("../../../../src/models/index").Todo;

let targetTodo;
let url;
describe("PUT /api/todos/:id", () => {
  before(async () => {
    const promises = [];
    for (let i = 0; i < 5; i++) {
      promises.push(todoFactory());
    }
    await Promise.all(promises);

    targetTodo = await Todo.findOne();
    url = `/api/todos/${targetTodo.id}`;
  });

  it("更新したデータの確認（正常系）", () => {
    return requestHelper
      .requestAPI("put", url, 200)
      .set("Accept", "application/json")
      .send({ title: "titleA", body: "bodyA", completed: true })
      .then(response => {
        assert.equal(
          response.body.title,
          "titleA",
          "titleの値が正しくありません。"
        );
        assert.equal(
          response.body.body,
          "bodyA",
          "bodyの値が正しくありません。"
        );
        assert.equal(
          response.body.completed,
          true,
          "completedの値が正しくありません。"
        );
      });
  });

  it("更新したデータの確認（異常系）", () => {
    return requestHelper
      .requestAPI("put", "/api/todos/1", 404)
      .set("Accept", "application/json")
      .then(response => {
        assert.deepEqual(JSON.parse(response.body), {
          message: "Not Found",
          code: "404"
        });
      });
  });
});

describe("GET /api/todos/:id", () => {
  after(async () => {
    await truncate();
  });

  it("更新したデータをDBから取得できるかの確認", () => {
    return requestHelper
      .requestAPI("get", url, 200)
      .set("Accept", "application/json")
      .then(response => {
        // DBの各カラムの値チェック
        assert.equal(
          response.body.title,
          "titleA",
          "titleの値が更新されていません。"
        );
        assert.equal(
          response.body.body,
          "bodyA",
          "bodyの値が更新されていません。"
        );
        assert.equal(
          response.body.completed,
          true,
          "completedの値が更新されていません。"
        );
      });
  });
});
