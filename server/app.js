import express from "express";
import "./dbConnect.js";
import User from "./models/Users.js";
import bcrypt from "bcrypt";

const app = express();
const port = 5000;
app.use(express.json()); //body parser
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

//register api
app.post("/api/user/register", async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.body.email });
    if (userData)
      return res.status(400).json({ error: "Email already registered" });

    const hash = await bcrypt.hash(req.body.password, 12);
    const newData = new User({
      ...req.body,
      password: hash,
    });

    await newData.save();
    res.status(200).json({ success: "New user registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error.Try again" });
  }
});

//login api
app.post("/api/user/login", async (req, res) => {
  try {
    const user=await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({ error: "Invalid email" });
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      // If password does not match, return error
      return res.status(400).json({ error: "Incorrect password" });
    }
    res.status(200).json({ success: "Login successful" })
    console.log("success");
  } catch (error) {
    console.log(error);
      res.status(500).json({ error: "Internal server error.Try again" });
    
  }
});

app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});
