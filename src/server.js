const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const apiRouter = require("./resources/api.router");

// URLエンコードする
// （URLに含むことが禁止されている文字を変換する）
app.use(bodyParser.urlencoded({ extended: true }));

// JSONをパースする
// (JSONデータを解析して使用できるようにする)
app.use(bodyParser.json());

// localhost:3000/apiにマッチングした場合、
// api.routerのモジュールを利用する
app.use("/api", apiRouter);

module.exports = app;
