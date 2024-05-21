import mongoose from "mongoose";
 async function connectDB(){
    try {
        await mongoose.connect("mongodb+srv://numan:Numan@projects.rcpzybc.mongodb.net/tasky-app")
        console.log("Connected to mongoDB");
    } catch (error) {
        console.log(error);
    }
 }
 connectDB()