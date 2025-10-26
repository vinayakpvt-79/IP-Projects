import { useState } from "react";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { motion } from "framer-motion";
import { login } from "../Api.js";
import AnimatedForm from "../components/AnimatedForm";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form);
    if (res.token) {
      localStorage.setItem("token", res.token);
      alert("Login successful!");
    } else {
      alert(res.msg || "Login failed");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-linear-to-br from-gray-950 via-gray-900 to-black relative overflow-hidden">
      {/* Soft glowing background animation */}
      <motion.div
        className="absolute w-72 h-72 bg-indigo-600/30 rounded-full blur-3xl"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-gray-900/80 p-10 rounded-2xl shadow-2xl backdrop-blur-md border border-gray-800 w-80"
      >
        <h2 className="text-white text-2xl font-semibold text-center mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Username field */}
          <div className="flex items-center bg-gray-800 rounded-lg p-2 focus-within:ring-2 focus-within:ring-indigo-500">
            <User className="text-gray-400 mx-2" size={18} />
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
              className="bg-transparent outline-none text-white flex-1"
              required
            />
          </div>

          {/* Password field with eye toggle */}
          <div className="flex items-center bg-gray-800 rounded-lg p-2 focus-within:ring-2 focus-within:ring-indigo-500">
            <Lock className="text-gray-400 mx-2" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="bg-transparent outline-none text-white flex-1"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-indigo-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-4 bg-indigo-600 py-2 rounded-lg font-bold text-white hover:bg-indigo-700 transition-all"
          >
            Login
          </motion.button>
        </form>

        <p className="text-sm text-gray-400 text-center mt-5">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-400 hover:underline">
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
}
