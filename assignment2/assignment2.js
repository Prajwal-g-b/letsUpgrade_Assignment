const { RSA_PKCS1_OAEP_PADDING } = require('constants');
const express=require('express');
const mongoose=require('mongoose');

const app=express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/pokiapi",{useNewUrlParser:true},()=>{
    console.log("mongo server is running");
})

const pokemonSchema=new mongoose.Schema({
    name:String,
    type:String,
    imageUrl:String
})

const pokemonModel= new mongoose.model('pokimons',pokemonSchema); 


app.get("/pokimons",async (req,res)=>{

    let data=await pokemonModel.find();
    res.send(data);
})
app.post("/pokimons",(req,res)=>{

    let pock=req.body;
    let pockObj = new pokemonModel(pock);

    pockObj.save((err,data)=>{
        if(err==null){
            res.send({message:"pokemon created"})
            }
    });
    
})


app.delete("/pokimons/:id",(req,res)=>{
    let id=req.params.id;
    console.log(id);
    
    pokemonModel.deleteOne({_id:id},(err,data)=>{
        if(err==null){
    res.send({message:"pokemon deleted"})

        }
    })
})
app.get("/pokimons/:id",async (req,res)=>{
    let id=req.params.id;
    
    let data=await pokemonModel.find({_id:id});
    res.send(data);
    
})

app.put("/pokimons/:id",(req,res)=>{

    let id=req.params.id;
    let pokemon=req.body;

    pokemonModel.updateOne({_id:id},pokemon,(err,data)=>{

        if(err===null)
        {
            res.send("Pokemon Updated");
        }
            
    })

})


app.listen(8000,()=>{
    console.log("server is running");

})