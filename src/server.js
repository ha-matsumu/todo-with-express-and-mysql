const express = require("express");
const app = express();
const apiRouter = require("./resources/api.router");

// localhost:3000/apiにマッチングした場合、
// api.routerのモジュールを利用する
app.use("/api", apiRouter);

module.exports = app;