const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var room = new mongoose.Schema({
  name: {
    type: String,
  },
  participants: [String],
  messages: [
    {
      message: { type: String },

      sender: { type: String },

      dateCreated: { type: String },
    },
  ],
});
var Room = mongoose.model("Room", room);
module.exports = Room;
