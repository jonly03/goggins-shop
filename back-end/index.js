const express = require("express");
const data = require("./utils/data");
const router = express.Router();

router.get("/merch", (req, res) => {
  res.json(data);
});

module.exports = router;
