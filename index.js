const express = require("express");
const path = require("path");
const apiRoutes = require("./back-end");
const PORT = process.env.PORT || 4000;
const server = express();

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  server.use(express.static("front-end/build"));
}

server.use("/api", apiRoutes);

// Send every other request to the React app
// Define any API routes before this runs
server.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./front-end/build/index.html"));
});

server.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
