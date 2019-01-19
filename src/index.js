const app = require("./server");
const chalk = require("chalk");
const portNumber = 3000;

// サーバーを始動し、ポート3000で接続
app.listen(portNumber, () => {
  console.log("Trivial quiz app listening on port", chalk.green(portNumber), "!");
});
