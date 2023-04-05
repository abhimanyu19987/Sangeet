const express =require ("express");
const passport =require("passport");
const Playlist =require("../models/Playlist");
const router = express.Router();
const User =require("../models/User");
const Song =require("../models/Song");

// create a playlist 
router.post("/create",
passport.authenticate("jwt", {session : false}),
async (req, res) => {
    const currentUser = req.user;
    const {name ,thumbnail,songs} = req.body;
    if(!name||!thumbnail||!number)
    return res.status(301).json({err: "Insufficient data"});


    const playlistData = {thumbnail,name,songs,owner:currentUser._id,collaborater:[],
    };
    
     const playlist = await Playlist.create(playlistsData);
    return res.status(200).json(playlist);


}
);


// get the pplaylist as a get router

router.get("/get/playlist/:playlistId",
passport.authenticate("jwt", {session : false}),async (req,res) => {
    const playlistId = req.params.playlistId;
    const playlist =await Playlist.findOne({_id: playlistId});
    if(!playlist){
        return res.status(301).json({err:"Invalid id"});
    }
    return res.status(200).json(playlist);


});
router.get("/get/artist/:artistId",passport.authenticate("jwt",{session:false}),async(req,res) =>{
    const artistId =req.params.artistId;

    const artist =await UserModel.findOne({id:artistId});
    if(!artist){
        return res.status(304).json({err:"invalid artist id" });
    }
    const playlist = await Playlist.find({owner:artistId});
    return res.status(200).json({data:playlists});
})


// add a song to playlist

router .post("/add/song",passport.authenticate("jwt",{session:false}),s=async(req,res)=>{
const currentUser =req.body;
const {playlist,songId}=req.body;
if(!playlist){
    return res.status(304).json({err:"playlist doesn't exist"})
}
if(playlist.owner!=currentUser._id||!playlist.collaboraters.includes(currentUser._id)){
    return res.status(400).json({err:"Not allowed"});
}
const song =await sessionStorage.findOne({_id : songId});
if(!song){
    return res.status(304).json({err:"song does not exist"});
}
playlist.songpush(songId);
await playlist.save();

} )
module.exports =router;
