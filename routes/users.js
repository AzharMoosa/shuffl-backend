const express = require("express");
const router = express.Router();

const User = require("../models/User");

// GET
router.get("/:id", async (req, res) => {
  try {
    // Find User
    let user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// POST
router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    let user = User({ name });
    // Save User
    await user.save();
    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  const { name, room, x, y } = req.body;
  const updatedUser = {};
  try {
    let user = await User.findById(req.params.id);

    // Check If User Exists
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (x) {
      updatedUser.x = x;
    }

    if (y) {
      updatedUser.y = y;
    }

    if (name) {
      updatedUser.name = name;
    }

    if (room) {
      updatedUser.room = room;
    }

    // Update User
    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updatedUser },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
