import jwt from "jsonwebtoken";
import config from "config";

async function authMiddleware(req,res,next) {
    try {
         
        let decoded=jwt.verify(req.headers["auth-token"],config.get("SECRET_KEYS.JWT"))
        req.user=decoded
        next()
        
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Unauthorized or token expired." });
  }
};

 export default authMiddleware