const requestHelper = require("./requestHelper");

// 正常系のテスト
describe("GET /api/todos", () => {
  it("ステータスコード200になるはず", () => {
    return requestHelper.requestAPI("get", "/api/todos", 200);
  });
});

describe("POST /api/todos", () => {
  it("ステータスコード200になるはず", () => {
    return requestHelper.requestAPI("post", "/api/todos", 200);
  });
});

describe("PUT /api/todos/1", () => {
  it("ステータスコード200になるはず", () => {
    return requestHelper.requestAPI("put", "/api/todos/1", 200);
  });
});

describe("DELETE /api/todos/1", () => {
  it("ステータスコード200になるはず", () => {
    return requestHelper.requestAPI("delete", "/api/todos/1", 200);
  });
});

// 異常系のテスト
describe("GET /api/abc", () => {
  it("ステータスコード404になるはず", () => {
    return requestHelper.requestAPI("get", "/api/abc", 404);
  });
});

describe("POST /api/abc", () => {
  it("ステータスコード404になるはず", () => {
    return requestHelper.requestAPI("post", "/api/abc", 404);
  });
});

describe("PUT /api/abc", () => {
  it("ステータスコード404になるはず", () => {
    return requestHelper.requestAPI("put", "/api/abc", 404);
  });
});

describe("DELETE /api/abc", () => {
  it("ステータスコード404になるはず", () => {
    return requestHelper.requestAPI("delete", "/api/abc", 404);
  });
});