const assert = require("power-assert");
const requestHelper = require("../requestHelper");

describe("POST /api/todos", () => {
  it("作成したデータの確認", () => {
    return requestHelper
      .requestAPI("post", "/api/todos", 200)
      .set("Accept", "application/json")
      .send({ title: "titleA", body: "bodyA", completed: false })
      .then(response => {
        // DBの各カラムのデータの確認
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
          "completedは'false'ではありません。"
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
      });
  });
});
