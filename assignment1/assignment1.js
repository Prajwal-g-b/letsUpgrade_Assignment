const express=require('express');
const app=express();
app.use(express.json());


app.get("/first",(req,res)=>{

    res.send({message:"Hi! this is the first assignment"});

}) 
app.get("/second",(req,res)=>{

    res.send("This s the second response received by get method");

}) 
app.get("/third",(req,res)=>{

    res.send({Car:"hundai",model:"",color:"white"});

})     


app.post("/postdata",(req,res)=>{

    console.log(req.body);
    res.send("Post the request");

})

//created and started the server
app.listen(8000,()=>{
    console.log("server is running");

})