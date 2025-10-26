import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

 const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(403).json({ msg: "Invalid token" });
  }
};
export default authMiddleware;