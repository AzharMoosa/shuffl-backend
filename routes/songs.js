const express = require("express");
const router = express.Router();

const Song = require("../models/Song");

// Get Song
router.get("/:id", async (req, res) => {
  try {
    // Find Song
    let song = await Song.findById(req.params.id);
    res.json(song);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// Create Song
router.post("/", async (req, res) => {
  const { name, link, artist } = req.body;
  try {
    let data = {
      song: name,
      artist: artist,
    };

    let song = Song({ name, link, data });

    // Save Song
    await song.save();

    res.json({ song });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update Song
router.put("/:id", async (req, res) => {
  const { name, link } = req.body;
  const updatedSong = {};

  try {
    let song = await Song.findById(req.params.id);

    // Check If Song Exists
    if (!song) {
      return res.status(404).json({ msg: "Song not found" });
    }

    if (name) {
      updatedSong.name = name;
    }

    if (link) {
      updatedSong.link = link;
    }

    // Update Song
    song = await Song.findByIdAndUpdate(
      req.params.id,
      { $set: updatedSong },
      { new: true }
    );

    res.json(song);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// DELETE
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
