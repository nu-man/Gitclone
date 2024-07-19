import express from "express";
import bcrypt from "bcrypt"
import User from "../../models/Users.js";
import sendMail from "../../utils/sendMail.js";
import sendSMS from "../../utils/sendSMS.js";
import config from "config";

import jwt from "jsonwebtoken"
import authMiddleware from "../../middleware/auth.js";

const router = express.Router();

/*
  API: /api/task/add
  Desc: User Signup
  Method: POST
  Access: Private
  Validation: email is unique, password strenght

*/ 

router.post("/add", authMiddleware,async(req,res)=>{
    try {
        res.status(200).send("Its working")
        
    } catch (error) {
        console.log(error);
    res.status(500).json({ error: "Internal server error. Try again." });
    }
    
    

})



export default router;
