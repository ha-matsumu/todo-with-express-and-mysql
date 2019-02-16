const app = require("./server");
const chalk = require("chalk");
const portNumber = 3000;

const url = `http://localhost:${portNumber}/api/todos`;

// サーバーを始動し、ポート3000で接続
app.listen(portNumber, () => {
  console.log("Trivial quiz app listening on port", portNumber, "!");
  console.log(
    "Access to",
    chalk.black.bgWhite(url),
    "from your browser or Postman."
  );
});
