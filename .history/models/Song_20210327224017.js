const mongoose = require("mongoose");

const SongSchema = mongoose.Schema({
  name: {
    type: String,
  },
  link: {
    type: String,
  },
  playlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "playlist",
  },
});

module.exports = mongoose.model("song", SongSchema);
