const express= require("express");//import all express funtionalities
const app=express();//we bring all package code in our local file

const port =8000;

app.get("/",(req,res)=>{
    res.send("Hello World");
});

app.listen(port,()=>{
    console.log ("App is runing on port "+port);
}); 