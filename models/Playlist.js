const mongoose = require("mongoose");

const PlaylistSchema = mongoose.Schema({
  song: { type: Array, default: [] },
});

module.exports = mongoose.model("playlist", PlaylistSchema);
