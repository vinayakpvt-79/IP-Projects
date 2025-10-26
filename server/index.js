import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cors from "cors";
import bodyParser from "body-parser";
import User from "./models/User.js"
import {JWT_SECRET,MONGO_URI}  from "./config.js";
import bcrypt from "bcryptjs";
import FormData from "./models/FormData.js";
import authMiddleware from "./midleware/auth.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(MONGO_URI).then(() => console.log("✅ MongoDB Connected"));


app.post("/api/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, gender, contact, password } = req.body;

    if (!username || !email || !gender || !contact || !password)
      return res.status(400).json({ msg: "All fields are required" });

    const exists = await User.findOne( { email });
    if (exists) return res.status(400).json({ msg: "User already exists" });

    // console.log("Creating user");
     const hashedPassword = await bcrypt.hash(password, 10);
     console.log("Hashed Password:", hashedPassword);
    await new User({ username, email, gender, contact, password:hashedPassword }).save();
    res.json({ msg: "Signup successful" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


app.post("/api/login", async (req, res) => {
  try {

    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ msg: "User Doesn't Exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


// POST - Save form data
app.post("/api/form", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ msg: "Title is required" });

    const newForm = await FormData.create({
      userId: req.userId,
      title,
      description
    });

    res.json({ msg: "Form saved", form: newForm });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET - Fetch form data for logged-in user
app.get("/api/form", authMiddleware, async (req, res) => {
  try {
    const data = await FormData.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});


app.listen(5000, () => console.log("🚀 Server running on port 5000"));
