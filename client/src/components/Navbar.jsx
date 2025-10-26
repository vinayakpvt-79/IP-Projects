import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
<nav>
       <nav className="p-4 bg-gray-950 text-white flex justify-center gap-6">
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/form">Form</Link>
        <Link to="/view">View</Link>

         {/* Logout button only if logged in */}
      {localStorage.getItem("token") && (
      <button
      onClick={handleLogout}
      className="ml-4 px-3 py-1 bg-red-600 rounded hover:bg-red-700"
      >
      Logout
      </button>
      
      )}
      </nav>

</nav>
)
}

export default Navbar