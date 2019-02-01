const request = require("supertest");
const app = require("../../../src/server");

module.exports = {
  requestAPI: (_method, _url, _statusCode) => {
    const lowerMethod = _method.toLowerCase();

    return request(app)
      [lowerMethod](_url)
      .expect(_statusCode);
  }
};
