const express=require("express");
const app=express();
const mongoose=require("mongoose");
require("dotenv").config();
const bodyParser=require("body-parser");
const authRoutes = require("./routes/authRoutes");
const classroomRoutes = require("./routes/classroomRoutes"); 
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const cors = require('cors'); // Import the cors package



app.use(cors({
  origin: '*', // Allow all origins
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use("/api/auth",authRoutes);
app.use("/student", studentRoutes);
app.use("/teacher",teacherRoutes)




const uri=process.env.MONGO_URL;

mongoose.connect(uri).then(() => {
    console.log('Db connection successful');
  }).catch((err) => {
    console.error(err);
  });
  app.use("/classroom", classroomRoutes);



app.get("/test",(req,res)=>{
    res.json({ message :"Hello hello"})
})

app.listen(8080,()=>{
    console.log("sever is listening to the port")
})