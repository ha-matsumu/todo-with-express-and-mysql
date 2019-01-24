const assert = require("power-assert");
const requestHelper = require("../requestHelper");

describe("POST /api/todos", () => {
  it("作成したデータの確認", () => {
    return requestHelper
      .requestAPI("post", "/api/todos", 200)
      .set("Accept", "application/json")
      .send({ title: "titleA", body: "bodyA", completed: false })
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
        assert.equal(response.body.id, 6, "idの値が正しくありません。");
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
});

describe("GET /api/todos/6", () => {
  it("作成したデータをDBから取得できるかの確認", () => {
    return requestHelper
      .requestAPI("get", "/api/todos/6", 200)
      .set("Accept", "application/json")
      .then(response => {
        // DBの各カラムの値チェック
        assert.equal(response.body.title, "titleA", "titleの値が正しくありません。");
        assert.equal(response.body.body, "bodyA", "bodyの値が正しくありません。");
        assert.equal(
          response.body.completed,
          false,
          "completedの値が正しくありません。"
        );
      });
  });
});
