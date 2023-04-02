const express =require("express");
const router = express.Router();
const bcrypt =require("bcrypt");
const User =require ("../models/User");
const {getToken}=require("../utils/helpers");
// router will help to register a user
router.post("/register",async(req,res)=>{
    // this code run whileregistering a user


    const {email,password,firstName,lastName,username}=req.body;
    // is user exist ?then through an error



    const user = await User.fondOne({email : email});
    if(user){
        
        return res.status(403).json({error:"A user with this email alredy exist"})
    }
    // else this is a valid user
    const hashedPassword =bcrypt.hash{password,10};
    const newUserData={email,password:hashedPassword,firstName,lastName,username};
    const newUser =await User.create(newUserData);



    const token = await getToken{email,newUser};


    const userToReturn ={...newUser.toJSON(),token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});
