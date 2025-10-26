import mongoose from "mongoose";

const formDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  title: { type: String},
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("FormData", formDataSchema);
