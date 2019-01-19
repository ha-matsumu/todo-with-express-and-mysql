const request = require("supertest");
const app = require("../../../src/server");

describe("GET /api", () => {
  it("ステータスコード200になるはず", () => {
    request(app)
      .get("/api/todos")
      .expect(200);
  });
});

describe("POST /api", () => {
  it("ステータスコード200になるはず", () => {
    request(app)
      .post("/api/todos")
      .expect(200);
  });
});

describe("PUT /api", () => {
  it("ステータスコード200になるはず", () => {
    request(app)
      .put("/api/todos")
      .expect(200);
  });
});

describe("DELETE /api", () => {
  it("ステータスコード200になるはず", () => {
    request(app)
      .delete("/api/todos")
      .expect(200);
  });
});
