const path = require("path");
const express = require("express");

const app = express();
const PORT = 4000;

app.use("/", express.static(path.join(__dirname, "./")));

app.listen(PORT, () => {
  console.log(`App listen on http://localhost:${PORT}`);
});
