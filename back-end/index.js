const express = require("express");
const getData = require("./utils/data");
const router = express.Router();

router.get("/merch", async (req, res) => {
  const data = await getData();
  res.json(data);
});

module.exports = router;
