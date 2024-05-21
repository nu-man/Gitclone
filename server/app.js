import express from "express";
import "./dbConnect.js"
import User from './models/Users.js';
const app = express();
const port = 5000;
app.use(express.json()); //body parser
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post("/api/user/register", async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.body.email });
    if (userData)
      return res.status(400).json({ error: "Email already registered" });
    const newData = new User(req.body);
    await newData.save();
    res.status(200).json({ success: "New user registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error.Try again" });
  }
});

app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});
