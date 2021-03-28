const express = require("express");
const router = express.Router();

const Room = require("../models/Room");
const User = require("../models/User");

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

// Get Users in Room
router.get("/users/:id", async (req, res) => {
  try {
    // Find User
    let users = await User.find({ room: req.params.id });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// Get All Rooms
router.get("/", async (req, res) => {
  try {
    // Find User
    let rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// Rank
router.post("/rank", async (req, res) => {
  const { user, songs } = req.body;
  const { song, artist } = songData;
  try {
    let bestScore = -1;
    let bestRoomId = -1;
    let rooms = await Room.find();
    rooms.forEach((room) => {
      // calculate the affinity of the user with this room
      let score = calculateScore(user, songData, room);
      // compare the obtained score with the best obtained by now
      if (score > bestScore) {
        score = bestScore;
        bestRoomId = roomId;
      }
    });

    if (bestRoomId == -1) {
      // no room is good enough: create a new room for this user
      new room(firstAvailableId);
      // assign the user to this new room
      bestRoomId = firstAvailableId;
      // update first available id
      firstAvailableId++;
    }

    // update field in the user class
    user.associatedRoom = bestRoomId;
    // Send response to the frontend with information about the assigned room

    res.json({ room });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

const calculateScore = (user, songData, room) => {};

// Create Room
router.post("/", async (req, res) => {
  const { roomType } = req.body;
  try {
    let room = Room({ roomType });

    // Save Room
    await room.save();

    res.json({ room });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update Room
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
