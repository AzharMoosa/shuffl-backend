const mongoose = require("mongoose");

const SongSchema = mongoose.Schema({
  name: {
    type: String,
  },
  link: {
    type: String,
  },
});

module.exports = mongoose.model("song", SongSchema);
