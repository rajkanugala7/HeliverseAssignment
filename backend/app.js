const express=require("express");
const app=express();
const mongoose=require("mongoose");
require("dotenv").config();
const bodyParser=require("body-parser");


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())


const uri=process.env.MONGO_URL;

mongoose.connect(uri).then(() => {
    console.log('Db connection successful');
  }).catch((err) => {
    console.error(err);
  });
app.listen(8080,()=>{
    console.log("sever is listening to the port")
})