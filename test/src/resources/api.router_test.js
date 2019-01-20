const request = require("supertest");
const app = require("../../../src/server");

function testGet(_url, _statusCode) {
  return request(app)
    .get(_url)
    .expect(_statusCode);
}

function testPost(_url, _statusCode) {
  return request(app)
    .post(_url)
    .expect(_statusCode);
}

function testPut(_url, _statusCode) {
  return request(app)
    .put(_url)
    .expect(_statusCode);
}

function testDelete(_url, _statusCode) {
  return request(app)
    .delete(_url)
    .expect(_statusCode);
}

// 正常系のテスト
describe("GET /api/todos", () => {
  it("ステータスコード200になるはず", () => {
    return testGet("/api/todos", 200);
  });
});

describe("POST /api/todos", () => {
  it("ステータスコード200になるはず", () => {
    return testPost("/api/todos", 200);
  });
});

describe("PUT /api/todos/1", () => {
  it("ステータスコード200になるはず", () => {
    return testPut("/api/todos/1", 200);
  });
});

describe("DELETE /api/todos/1", () => {
  it("ステータスコード200になるはず", () => {
    return testDelete("/api/todos/1", 200);
  });
});

// 異常系のテスト
describe("GET /api/abc", () => {
  it("ステータスコード404になるはず", () => {
    return testGet("/api/abc", 404);
  });
});

describe("POST /api/abc", () => {
  it("ステータスコード404になるはず", () => {
    return testPost("/api/abc", 404);
  });
});

describe("PUT /api/abc", () => {
  it("ステータスコード404になるはず", () => {
    return testPut("/api/abc", 404);
  });
});

describe("DELETE /api/abc", () => {
  it("ステータスコード404になるはず", () => {
    return testDelete("/api/abc", 404);
  });
});

module.exports = testGet;