const mongoose = require("mongoose");

const PlaylistSchema = mongoose.Schema({
  songs: { type: Array, default: [] },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("playlist", PlaylistSchema);
