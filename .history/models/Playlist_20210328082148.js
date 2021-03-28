const mongoose = require("mongoose");

const PlaylistSchema = mongoose.Schema({
  songs: { type: Array, default: [] },
});

module.exports = mongoose.model("playlist", PlaylistSchema);
