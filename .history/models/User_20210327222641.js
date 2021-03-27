const mongoose = require("mongoose");
const Room = require("./Room");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "rooms",
  },
  playlists: { type: Array, default: [] },
  x: {
    type: Number,
  },
  y: {
    type: Number,
  },
});

module.exports = mongoose.model("user", UserSchema);
