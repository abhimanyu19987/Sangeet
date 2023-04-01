const express= require("express");//import all express funtionalities
const mongoose =require ("mongoose");
require("dotenv").config();
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