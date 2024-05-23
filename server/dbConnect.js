import mongoose from "mongoose";
import config from "config"
 async function connectDB(){
    try {
        await mongoose.connect(config.get("DB_URL"))
        console.log("Connected to mongoDB");
    } catch (error) {
        console.log(error);
    }
 }
 connectDB()