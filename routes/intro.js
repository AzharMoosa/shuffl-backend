const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json({
    msg: "Welcome to the Shuffl API",
  });
});

module.exports = router;
