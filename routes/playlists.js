const express = require("express");
const router = express.Router();

const Playlist = require("../models/Playlist");
const Song = require("../models/Song");

// Get Playlist
router.get("/:id", async (req, res) => {
  try {
    // Find Playlist
    let playlist = await Playlist.findById(req.params.id);
    res.json(playlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// Create Playlist
router.post("/", async (req, res) => {
  const { user } = req.body;
  try {
    let playlist = Playlist({ user });

    // Save Playlist
    await playlist.save();

    res.json({ playlist });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update Playlist
router.put("/:id", async (req, res) => {
  const { song } = req.body;
  const updatedPlaylist = {};

  try {
    let playlist = await Playlist.findById(req.params.id);

    // Check If Playlist Exists
    if (!playlist) {
      return res.status(404).json({ msg: "Playlist not found" });
    }

    if (song) {
      updatedPlaylist.songs = [song, ...playlist.songs];
    }

    // Update Playlist
    playlist = await Playlist.findByIdAndUpdate(
      req.params.id,
      { $set: updatedPlaylist },
      { new: true }
    );

    res.json(playlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// Delete Playlist
router.delete("/:id", async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({ msg: "Playlist not found" });
    }

    await Playlist.findByIdAndRemove(req.params.id);

    res.json(playlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
