import { motion } from "framer-motion";

export default function AnimatedForm({ title, onSubmit, fields, buttonText }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center bg-gray-900 text-white rounded-2xl p-10 shadow-2xl"
    >
      <h2 className="text-2xl font-semibold mb-5">{title}</h2>
      <form onSubmit={onSubmit} className="flex flex-col w-64">
        {fields.map((field, i) => (
          <input
            key={i}
            {...field}
            className="mb-3 p-2 rounded bg-gray-800 border border-gray-700 focus:border-indigo-500"
          />
        ))}
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-indigo-600 mt-3 py-2 rounded font-bold hover:bg-indigo-700"
        >
          {buttonText}
        </motion.button>
      </form>
        <p className="text-sm text-gray-400 text-center mt-5">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-400 hover:underline">
            Login
          </a>
        </p>
    </motion.div>
  );
}
