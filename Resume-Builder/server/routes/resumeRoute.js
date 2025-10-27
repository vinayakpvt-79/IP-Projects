import express from "express";
import Resume from "../models/Resume.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const resume = new Resume(req.body);
    await resume.save();
    res.status(201).json({ message: "Resume saved successfully", resume });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving resume", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching resumes" });
  }
});

export default router;
