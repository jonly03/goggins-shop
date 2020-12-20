const express = require("express");
const data = require("./utils/data");
const server = express();

server.get("/", (req, res) => {
  res.json(data);
});

server.listen(process.env.PORT || 4000, () => {
  console.log("server listening");
});
