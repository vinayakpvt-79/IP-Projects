import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DataForm from "./pages/Dataform";
import ViewData from "./pages/ViewData";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
export default function App() {
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    window.location.href = "/login";   // redirect to login
    };

  return (
    <BrowserRouter>
   <Navbar />
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
      <Footer/>
    </BrowserRouter>
  );
}
