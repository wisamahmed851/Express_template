const mongoose = require("mongoose")

const connectDB = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/firstone");
        console.log("Mongo Db is connect");
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;