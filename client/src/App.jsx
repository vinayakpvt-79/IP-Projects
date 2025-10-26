import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DataForm from "./pages/Dataform";
import ViewData from "./pages/ViewData";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
export default function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-gray-950 text-white flex justify-center gap-6">
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/form">Form</Link>
        <Link to="/view">View</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/form"
          element={
            <ProtectedRoute>
              <DataForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view"
          element={
            <ProtectedRoute>
              <ViewData />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
