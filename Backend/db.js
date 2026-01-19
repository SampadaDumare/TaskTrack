const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/TaskTrack"

const connectToMongo = async ()=>{
    try{
        await mongoose.connect(mongoURI);
        console.log("Connection to mongo successful");
    }catch(err){
        console.log("Connection to mongo failed", err);
    }
}

module.exports = connectToMongo;