import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
export default function App() {
  return (
    <BrowserRouter>
      {/* <nav className="p-4 bg-gray-950 text-white flex justify-center gap-6">
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
