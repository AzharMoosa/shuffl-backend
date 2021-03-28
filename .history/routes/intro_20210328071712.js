const express = require("express");
const router = express.Router();

// Get One Room
router.get("/:id", async (req, res) => {
  try {
    // Find Room
    let room = await Room.findById(req.params.id);
    res.json(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
