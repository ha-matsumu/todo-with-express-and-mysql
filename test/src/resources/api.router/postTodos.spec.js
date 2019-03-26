const assert = require("power-assert");
const requestHelper = require("../requestHelper");
const todoFactory = require("../../factories/todo");
const truncate = require("../../truncate");
const Todo = require("../../../../src/models/index").Todo;

let createdTodoId;
let expectedOrderNumber;

describe("POST /api/todos", () => {
  before(async () => {
    const promises = [];
    for (let i = 0; i < 5; i++) {
      promises.push(todoFactory());
    }
    await Promise.all(promises);

    const maxOrderNumber = await Todo.max("order_number");
    expectedOrderNumber = maxOrderNumber + 1;
  });

  it("作成したデータの確認(正常系)", () => {
    return requestHelper
      .requestAPI("post", "/api/todos", 200)
      .set("Accept", "application/json")
      .send({
        title: "titleA",
        body: "bodyA",
        completed: false
      })
      .then(response => {
        // 型チェック
        assert.equal(
          typeof response.body.id,
          "number",
          "idは'number'型ではありません。"
        );
        assert.equal(
          typeof response.body.title,
          "string",
          "titleは'string'型ではありません。"
        );
        assert.equal(
          typeof response.body.body,
          "string",
          "bodyは'string'型ではありません。"
        );
        assert.equal(
          response.body.completed,
          0,
          "completedは'boolean'型ではありません。"
        );
        assert.equal(
          typeof response.body.order_number,
          "number",
          "order_numberは'number'型ではありません。"
        );
        assert.equal(
          typeof response.body.createdAt,
          "string",
          "createdAtは'string'型ではありません。"
        );
        assert.equal(
          typeof response.body.updatedAt,
          "string",
          "updatedAtは'string'型ではありません。"
        );

        // 値チェック
        createdTodoId = response.body.id;
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
          false,
          "completedの値が正しくありません。"
        );
      });
  });

  it("作成したデータの確認(異常系)", () => {
    return requestHelper
      .requestAPI("post", "/api/todos", 500)
      .set("Accept", "application/json")
      .then(response => {
        assert.deepEqual(response.body, {
          message: "Server Error",
          code: 500
        });
      });
  });
});

describe("GET /api/todos/:id", () => {
  after(async () => {
    await truncate();
  });

  it("作成したデータをDBから取得できるかの確認", () => {
    return requestHelper
      .requestAPI("get", "/api/todos/" + createdTodoId, 200)
      .set("Accept", "application/json")
      .then(response => {
        // DBの各カラムの値チェック
        assert.deepEqual(response.body, {
          id: createdTodoId,
          title: "titleA",
          body: "bodyA",
          completed: false,
          order_number: expectedOrderNumber,
          createdAt: response.body.createdAt,
          updatedAt: response.body.updatedAt
        });
      });
  });
});
