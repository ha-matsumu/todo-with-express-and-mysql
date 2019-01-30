const assert = require("power-assert");
const requestHelper = require("../requestHelper");
const truncate = require("../../truncate");
let createdTodoid;

describe("POST /api/todos", () => {
  it("作成したデータの確認(正常系)", () => {
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
        createdTodoid = response.body.id;
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
        console.log(response.body);
        assert.equal(
          response.body,
          "Server Error",
          "データの作成に成功しています。"
        );
      });
  });
});

describe("GET /api/todos/1", () => {
  after(async () => {
    await truncate();
  });

  it("作成したデータをDBから取得できるかの確認", () => {
    return requestHelper
      .requestAPI("get", "/api/todos/" + createdTodoid, 200)
      .set("Accept", "application/json")
      .then(response => {
        // DBの各カラムの値チェック
        assert.deepEqual(response.body, {
          id: createdTodoid,
          title: "titleA",
          body: "bodyA",
          completed: false,
          createdAt: response.body.createdAt,
          updatedAt: response.body.updatedAt
        });
      });
  });
});
