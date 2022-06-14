
const mongoose=require("mongoose")
const cors=require('cors')
const env=require('dotenv')
env.config()
const express= require("express");
//require("dotenv").config();//this is for .env file

const app=express()


const database= require('./database/db');


app.use(express.json())
app.use(cors())

const indexRoutes = require('./Routes/user.route')
app.use('/api', indexRoutes);


app.get("/",(req,res)=>{
   
  

    return res.json(
        {"message":"hello"}
    )

})

app.listen(3000,()=>{
    console.log("server up")
})

