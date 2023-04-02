const express= require("express");//import all express funtionalities
const mongoose =require ("mongoose");
const JwtStrategy = require("passport-jwt").Strategy,
ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();
const passport =require("passport");
const User=require("./models/User");
const app=express();//we bring all package code in our local file
const port =8080;
mongoose.connect(  

"mongodb+srv://abhimanyukumar19987:"+process.env.MONGO_PASSWORD+"@cluster0.d0rguwk.mongodb.net/?retryWrites=true&w=majority" ,
   {
    useNewUrlParser: true,
    useUnifiedTopology:true,
   }
)


.then ((x)=>{
    console.log("Connected to  Mongo!!");
})

.catch((err)=>{
    console.log("Error while connecting to Mongo");
});

app.get("/",(req,res)=>{
    res.send("Hello World");
});

app.listen(port,()=>{
    console.log ("App is runing on port "+port);
  
}); 
//passport =frameowrk of authentication
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "thisKeyShouldBeSecret";
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));