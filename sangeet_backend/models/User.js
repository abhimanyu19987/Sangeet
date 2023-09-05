const mongoose = require("mongoose");

const User = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
    private: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  likedPlaylist: {
    type: String,
    default: "",
  },
  subscribedArtist: {
    type: String,
    default: "",
  },
  Likedsongs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Song",
    },
  ],
});

const UserModel = mongoose.model("User", User);
module.exports = UserModel;