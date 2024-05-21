import mongoose from "mongoose"

const User = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
      },
      fullname: {
        type: String,
        required: true,
     },
    

     phonenumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const UserModel = mongoose.model("", UserSchema, "contact");
export default User;
