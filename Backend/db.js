const mongoose = require('mongoose');
// require('dotenv').config();

// const mongoURI = "mongodb://localhost:27017/TaskTrack"

const connectToMongo = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connection to mongo successful");
    }catch(err){
        console.log("Connection to mongo failed", err.message);
    }
}

module.exports = connectToMongo;