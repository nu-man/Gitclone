import express from "express";
import bcrypt from "bcrypt"
import User from "../../models/Users.js";
import sendMail from "../../utils/sendMail.js";
import sendSMS from "../../utils/sendSMS.js";
import config from "config";

import jwt from "jsonwebtoken"

const router = express.Router();

// Register API

/*
  API: /api/user/register
  Desc: User Signup
  Method: POST
  Access: Public
  Validation: email is unique, password strenght

*/ 
router.post("/register", async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.body.email });
    if (userData)
      return res.status(400).json({ error: "Email already registered" });

    const emailToken = (Math.random() + 1).toString(16).substring(2);
    const smsToken = (Math.random() + 1).toString(16).substring(2);
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
      emailToken,
      smsToken,
      userVerified: {
        email: false,
        sms: false,
      },
    });

    await newUser.save();

    // Email confirmation logic
    sendMail({
      subject: "Tasky Email Confirmation",
      to: req.body.email,
      body: `Hello ${req.body.fullname},<br/>
          Welcome to Tasky App. Please <a href="${config.get(
            "URL"
          )}/api/user/verify/email/${emailToken}">Click here</a> to verify your email.<br/><br/>
          Thank you,<br/>
          <b>Tasky App</b>`,
    });

    //SMS verification
    sendSMS({
      to: req.body.phonenumber,
      body: `Hello ${req.body.fullname}
          Welcome to Tasky App. Please Click here to verify your mobile number:  ${config.get(
            "URL"
          )}/api/user/verify/sms/${smsToken}.`,
    });

    res.status(200).json({ success: "New user registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error. Try again." });
  }
});

//email verification route
/*
  API: /api/user/verify/email/:token"
  Desc: User emali verification
  Method: GET
  Access: Public
  Params: token
  Validation: token shouldbe valid

*/ 
router.get("/verify/email/:token", async (req, res) => {
  try {
    let token = req.params.token;
    const found = await User.findOne({ emailToken: token });
    if (found.userVerified.email)
      return res.status(200).send("<h1>Email is already verified </h1>");
    found.userVerified.email = true;

    await found.save();
    res.status(200).send("<h1>Email is verified successfully</h1>");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error. Try again." });
  }
});

//sms verification route
/*
  API: /api/user/verify/sms/:token"
  Desc: User phone verification
  Method: GET
  Access: Public
  Params: token
  Validation: token shouldbe valid

*/ 
router.get("/verify/sms/:token", async (req, res) => {
  try {
    let token = req.params.token;
    const found = await User.findOne({ smsToken: token });
    if (found.userVerified.sms)
      return res.status(200).send("Phone number is already verified");
    found.userVerified.sms = true;

    await found.save();
    res.status(200).send("<h1>Phone number is verified</h1>");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error. Try again." });
  }
});


/*
login logic
  API: /api/user/login"
  Desc: User login
  Method: POST
  Access: Public
  Params: token
  Validation: valid email and pass

*/ 

router.post("/login", async (req, res) => {
  try {
    const found=await User.findOne({email:req.body.email})
    if(!found) {
      return res.status(401).json({error:"Invalid credentials "})
    }
    let match= await bcrypt.compare(req.body.password, found.password)
    if(!match){
      return res.status(401).json({error:"Invalid credentials "})
    }
    let payload={
      user_id: found._id,
      email: found.email
    }
    let token=jwt.sign(payload,config.get("SECRET_KEYS.JWT"),{expiresIn:"1hr"})
    res.status(200).json({success:"Valid token",token})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error. Try again." });
  }
});



/*
  API: /api/user/auth"
  Desc: jwt token auth
  Method: POST
  Access: Public
  Params: token
  Validation: valid token

*/ 

router.get("/auth", async (req, res) => {
  try {
         
        let decoded=jwt.verify(req.headers["auth-token"],config.get("SECRET_KEYS.JWT"))
        res.status(200).json({user_id:decoded.user_id})
        //console.log(decoded);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Unauthorized or token expired." });
  }
});






export default router;
