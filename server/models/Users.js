import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
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
  emailToken: {
    type: String,
    required: true,
  },
  smsToken: {
    type: String,
    required: true,
  },
  userVerified: {
    email: {
      type: Boolean,
      default: false,
    },
    sms: {
      type: Boolean,
      default: false,
    },
  },
});

const User = mongoose.model("User", UserSchema, "Users");
export default User;
