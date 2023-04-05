const express =require ("express");
const passport =require("passport");
const Playlist =require("../models/Playlist");
const router = express.Router();

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

router.get("/get/:playlistId",
passport.authenticate("jwt", {session : false}),async (req,res) => {
    const playlistId = req.params.playlistId;
    const playlist =await Playlist.findOne({_id: playlistId});
    if(!playlist){
        return res.status(301).json({err:"Invalid id"});
    }
    return res.status(200).json(playlist);
    

});

module.exports =router;
