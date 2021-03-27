const express = require("express");
const router = express.Router();

const Room = require("../models/Room");

// GET
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

// POST
router.post("/", async (req, res) => {
  const { roomType } = req.body;
  try {
    let room = Room({ roomType, user: req.user.id });

    // Save Room
    await room.save();

    res.json({ room });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  const { roomType, songPlaying } = req.body;
  const updatedRoom = {};

  try {
    let room = await Room.findById(req.params.id);

    // Check If Room Exists
    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }

    if (roomType) {
      updatedRoom.roomType = roomType;
    }

    if (songPlaying) {
      updatedRoom.songPlaying = songPlaying;
    }

    // Update Room
    room = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: updatedRoom },
      { new: true }
    );

    res.json(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }

    if (room.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Room.findByIdAndRemove(req.params.id);

    res.json(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
