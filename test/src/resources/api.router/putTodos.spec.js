const assert = require("power-assert");
const requestHelper = require("../requestHelper");
const todoFactory = require("../../factories/todo");
const truncate = require("../../truncate");

describe("PUT /api/todos/7", () => {
  before(async () => {
    const promises = [];
    for (let i = 0; i < 5; i++) {
      promises.push(todoFactory());
    }
    await Promise.all(promises);
  });

  it("更新したデータの確認（正常系）", () => {
    return requestHelper
      .requestAPI("put", "/api/todos/7", 200)
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
    return (
      requestHelper
        .requestAPI("put", "/api/todos/7", 200)
        .set("Accept", "application/json")
        // .send({ date: 2019-01-28 })
        .then(response => {
          console.log(response.body);

          // assert.equal(
          //   response.body.name,
          //   "SequelizeDatabaseError",
          //   "データの作成に成功しています。"
          // );
        })
    );
  });
});

describe("GET /api/todos/1", () => {
  after(async () => {
    await truncate();
  });

  it("更新したデータをDBから取得できるかの確認", () => {
    return requestHelper
      .requestAPI("get", "/api/todos/7", 200)
      .set("Accept", "application/json")
      .then(response => {
        // DBの各カラムの値チェック
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
});
