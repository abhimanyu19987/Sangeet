const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/Song");
const User = require("../models/User");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { name, thumbnail, track } = req.body;
    if (!name || !thumbnail || !track) {
      return res
        .status(301)
        .json({ err: "Insufficient details to create song" });
    }
    const artist = req.user._id;
    const songDetails = { name, thumbnail, track, artist };
    const createdSong = await Song.create(songDetails);
    return res.status(200).json(createdSong);
  }
);

router.get(
  "/get/mysongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    //  const currentUser = req.user;
    const songs = await Song.find({ artist: req.user._id }).populate("artist");
    return res.status(200).json({ data: songs });
  }
);

router.get(
  "/get/songs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const songs = await Song.find({ getall: "" });
    return res.status(200).json({ data: songs });
  }
);

router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { artistId } = req.params;
    const artist = await User.findOne({ _id: artistId });
    if (!artist) {
      return res.status(301).json({ err: "Artist does not exist" });
    }
    const songs = await Song.find({ artist: artistId });
    return res.status(200).json({ data: songs });
  }
);

router.get(
  "/get/songname/:songName",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log(123);
    const { songName } = req.params;
    const songs = await Song.find({ name: songName });
    return res.status(200).json({ data: songs });
  }
);

router.post(
  "/add/liked",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // console.log("a2");
    const currentUser = req.user;
    const { songId } = req.body;
    const song = await Song.findOne({ _id: songId });
    const findd = await currentUser.Likedsongs.find(
      (element) => element == songId
    );
    console.log(currentUser);
    console.log(findd);
    if (findd) {
      return 1;
    }

    if (!song) {
      return res.status(304).json({ err: "Song does not exist" });
    }
    console.log("a");

    currentUser.Likedsongs.push(song);
    await currentUser.save();

    return res.status(200).json(currentUser);
  }
);

router.get(
  "/get/liked",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    const user = await User.findOne({ _id: currentUser._id }).populate(
      "Likedsongs"
    );
    return res.status(200).json({ user });
  }
);

router.get(
  "/get/playlist/:playlistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const playlistId = req.params.playlistId;
    // I need to find a playlist with the _id = playlistId
    const playlist = await Playlist.findOne({ _id: playlistId }).populate(
      "songs"
    );
    if (!playlist) {
      return res.status(301).json({ err: "Invalid ID" });
    }
    return res.status(200).json(playlist);
  }
);

router.delete(
  "/deletesong",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // const currentUser = req.user;
    // const { artistId } = req.params;
    // const artist = await User.findOne({ _id: artistId });
    // if (!artist) {
    //   return res.status(301).json({ err: "Artist does not exist" });
    // }
    const { songId } = req.body;
    const song = await Song.findOne({ _id: songId });

    console.log(song);
    // const findd = await song.artists.find(
    //   (element) => element == songId
    // );
    // if (findd) {
    //   return 1;
    // }
    await song.remove();

    res.status(200).json({
      success: true,
      message: "Song Delete Successfully",
    });
  }
);
module.exports = router;