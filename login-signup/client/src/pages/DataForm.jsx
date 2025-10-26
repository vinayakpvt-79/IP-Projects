import { useState } from "react";
import { saveForm } from "../Api.js";
import { motion } from "framer-motion";

export default function DataForm() {
  const [form, setForm] = useState({ title: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await saveForm(form);
    alert(res.msg || "Error saving form");
    setForm({ title: "", description: "" });
  };

  return (
    <div className="h-screen flex justify-center items-center bg-linear-to-br from-gray-950 via-gray-900 to-black">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900/80 p-10 rounded-xl shadow-xl w-80"
      >
        <h2 className="text-white text-2xl font-semibold text-center mb-5">Enter Details</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="p-2 rounded bg-gray-800 border border-gray-700 text-white"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="p-2 rounded bg-gray-800 border border-gray-700 text-white"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-indigo-600 py-2 rounded text-white font-bold hover:bg-indigo-700"
          >
            Save
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
