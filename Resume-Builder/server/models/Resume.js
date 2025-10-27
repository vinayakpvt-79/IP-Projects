import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  profile: {
    fullName: String,
    title: String,
    email: String,
    phone: String,
    summary: String,
  },
  education: [
    {
      school: String,
      degree: String,
      from: String,
      to: String,
      details: String,
    },
  ],
  experience: [
    {
      company: String,
      role: String,
      from: String,
      to: String,
      details: String,
    },
  ],
  skills: [String],
}, { timestamps: true });

export default mongoose.model("Resume", resumeSchema);
