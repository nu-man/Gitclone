import express from "express";
import bcrypt from "bcrypt"
import User from "../../models/Users.js";
import sendMail from "../../utils/sendMail.js";
import sendSMS from "../../utils/sendSMS.js";
import config from "config";

const router = express.Router();

// Register API
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

// login logic















export default router;
