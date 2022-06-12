require("dotenv").config();//this is for .env file
const mongoose=require("mongoose")
const express= require("express");

const app=express()
app.use(express)

app.listen(3000,()=>{
    console.log("server up")
})


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}
).then(()=>{
    console.log("database connected")
})
.catch((err)=>{
    console.log(err);
})
