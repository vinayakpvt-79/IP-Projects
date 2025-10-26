import { useEffect, useState } from "react";
import { getForms } from "../Api.js";

export default function ViewData() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getForms();
      setForms(data);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-gray-950 p-10 text-white">
      <h1 className="text-2xl mb-6 text-center font-semibold">Your Saved Forms</h1>
      <div className="grid gap-4">
        {forms.map((item) => (
          <div
            key={item._id}
            className="bg-gray-800 p-4 rounded-xl border border-gray-700"
          >
            <h2 className="text-lg font-bold">{item.title}</h2>
            <p className="text-gray-400">{item.description}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(item.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
        {forms.length === 0 && <p className="text-gray-400 text-center">No data found.</p>}
      </div>
    </div>
  );
}
