import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, },
  contact: { type: String, required: true },
  password: { type: String}
});
export default mongoose.model("User", userSchema);
