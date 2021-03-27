const mongoose = require("mongoose");

const RoomSchema = mongoose.Schema({
  roomType: {
    type: String,
  },
  songPlaying: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "song",
  },
  playlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "playlist",
  },
});

module.exports = mongoose.model("room", RoomSchema);
