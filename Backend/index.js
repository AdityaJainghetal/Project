const express= require("express");
const app=express();
const bodyparser = require('body-parser')
const cors= require("cors");
const mongoose= require("mongoose");
const UserRoute= require("./routes/userRoute");
const studentModel = require("./models/studentModel");
const stuRoute =require("./routes/studentRoute")
const paymentRoute= require("./routes/payment");

require("dotenv").config();

const Port=process.env.PORT || 8000
mongoose.connect("mongodb://127.0.0.1:27017/TaskDb").then(()=>{
    console.log("DB connected!!!")
})
// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(cors());

app.use("/users", UserRoute);
app.use("/employer", stuRoute)
app.use("/api/payment/",paymentRoute);

app.listen(Port, ()=>{ 
     console.log(`Server run on ${Port}`)
})


