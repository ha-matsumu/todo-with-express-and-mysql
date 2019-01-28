const requestHelper = require("./requestHelper");

// 正常系のテスト
describe("DELETE /api/todos/1", () => {
  it("ステータスコード200になるはず", () => {
    return requestHelper.requestAPI("delete", "/api/todos/1", 200);
  });
});

// 異常系のテスト
describe("DELETE /api/abc", () => {
  it("ステータスコード404になるはず", () => {
    return requestHelper.requestAPI("delete", "/api/abc", 404);
  });
});
