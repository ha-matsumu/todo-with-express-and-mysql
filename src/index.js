const app = require("./server");
const chalk = require("chalk");

// サーバーを始動し、ポート3000で接続
app.listen(3000, () => {
  console.log("Trivial quiz app listening on port", chalk.green("3000"), "!");
});
