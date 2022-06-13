
const mongoose=require("mongoose")


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}
)

const dbconn= mongoose.connection;

dbconn.on("error",console.error.bind(console,"database connection error"));
dbconn.once('open', function() {
    console.log("database connected");
})
  
module.exports= dbconn;

