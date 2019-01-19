const express = require("express");
const app = express();
const chalk = require("chalk");

app.listen(3000, () => {
  console.log("Trivial quiz app listening on port", chalk.green("3000"),"!");
});