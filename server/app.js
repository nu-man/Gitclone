import express from "express";
import config from "config"
import "./dbConnect.js";
const app = express();
const port = config.get("PORT");

import userRouter from "./controllers/users/index.js";

app.use(express.json()); //body parser
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user/", userRouter);

app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});
