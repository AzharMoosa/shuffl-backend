const mongoose = require("mongoose");

const SongSchema = mongoose.Schema({
  name: {
    type: String,
  },
  songID: {
    type: String,
  },
  link: {
    type: String,
  },
  data: { song: String, artist: String },
});

module.exports = mongoose.model("song", SongSchema);
