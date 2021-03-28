const express = require("express");
const router = express.Router();

// Get Playlist
router.get("/:id", async (req, res) => {
  try {
    // Find Song
    let playlist = await Playlist.findById(req.params.id);
    res.json(playlist);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// Create Playlist
router.post("/", async (req, res) => {
  try {
    let playlist = Playlist();

    // Save Song
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
      return res.status(404).json({ msg: "Song not found" });
    }

    if (song) {
      updatedPlaylist.songs = [...updatedPlaylist.songs, song];
    }

    // Update Playlist
    playlist = await Playlist.findByIdAndUpdate(
      req.params.id,
      { $set: updatedSong },
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
    const song = await Song.findById(req.params.id);

    if (!song) {
      return res.status(404).json({ msg: "Song not found" });
    }

    await Song.findByIdAndRemove(req.params.id);

    res.json(song);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
