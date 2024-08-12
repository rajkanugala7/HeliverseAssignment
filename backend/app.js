const express=require("express");
const app=express();
const mongoose=require("mongoose");
require("dotenv").config();
const bodyParser=require("body-parser");
const authRoutes=require("./routes/authRoutes");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use("/api/auth",authRoutes);

const uri=process.env.MONGO_URL;

mongoose.connect(uri).then(() => {
    console.log('Db connection successful');
  }).catch((err) => {
    console.error(err);
  });


app.get("/test",(req,res)=>{
    res.json({ message :"Hello hello"})
})

app.listen(8080,()=>{
    console.log("sever is listening to the port")
})