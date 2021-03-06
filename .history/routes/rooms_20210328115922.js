const express = require("express");
const router = express.Router();

const Room = require("../models/Room");
const Playlist = require("../models/Playlist");
const Song = require("../models/Song");
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
  const { user, playlist } = req.body;
  let playlistData = await Playlist.findById(playlist);
  const { songs } = playlistData;
  try {
    let bestScore = -1;
    let bestRoomId = -1;
    let rooms = await Room.find();
    for (let i = 0; i < rooms.length; i++) {
      // calculate the affinity of the user with this room
      let score = await calculateScore(user, songs, rooms[i]);
      // compare the obtained score with the best obtained by now
      if (score > bestScore) {
        bestScore = score;
        bestRoomId = rooms[i];
      }
    }
    let room;
    if (bestRoomId == -1) {
      // no room is good enough: create a new room for this user
      room = Room({ roomType: "New" });
      await room.save();
      // assign the user to this new room
      bestRoomId = room._id;
    } else {
      room = bestRoomId;
      bestRoomId = room._id;
    }

    // update field in the user class
    let findUser = await User.findById(user);
    const updatedUser = {};
    updatedUser.room = bestRoomId;
    // Update User
    findUser = await User.findByIdAndUpdate(
      user,
      { $set: updatedUser },
      { new: true }
    );

    res.json({ room });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

const calculateScore = async (user, usersSongs, room) => {
  let artistsOccurrences = {};
  for (let i = 0; i < usersSongs.length; i++) {
    let song = await Song.findById(usersSongs[i]);
    const { data } = song;
    const { artist } = data;
    artistsOccurrences[artist] = (artistsOccurrences[artist] || 0) + 1;
  }
  // score representing the affinity of the user with the room
  let score = 0;
  let { playlist } = room;
  let playlistData = await Playlist.findById(playlist);
  if (playlistData != null) {
    let { songs } = playlistData;
    for (let i = 0; i < songs.length; i++) {
      let song = await Song.findById(songs[i]);
      const { data } = song;
      const { artist } = data;
      score += artistsOccurrences[artist];
    }
  }
  return score;
};

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
  const { roomType, songPlaying, playlist } = req.body;
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

    if (playlist) {
      updatedRoom.playlist = playlist;
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

    await Room.findByIdAndRemove(req.params.id);

    res.json(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
