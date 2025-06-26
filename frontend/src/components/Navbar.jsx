import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
      {/* Left Section: Logo and Title */}
      <Link to="/" className="flex items-center space-x-3">
        <img
          src="/images/ashoka.png"
          alt="Ashoka Emblem"
          className="h-14 w-14 rounded-full border border-gray-300 shadow"
        />
        <span className="text-2xl font-bold text-gray-800">Election India</span>
      </Link>

      <div className="space-x-6 text-lg font-medium">
        <Link to="/" className="hover:text-blue-600 transition">
          Home
        </Link>
        <Link to="/how-it-works" className="hover:text-blue-600 transition">
          How It Works
        </Link>
        <Link to="/faq" className="hover:text-blue-600 transition">
          FAQ
        </Link>
        <Link to="/contact" className="hover:text-blue-600 transition">
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
