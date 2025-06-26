import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/face-auth");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 px-4 text-center">
      <div className="max-w-xl">
        <img
          src={logo}
          alt="Logo"
          className="w-28 h-28 mb-6 rounded-full shadow-md mx-auto"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to</h1>
        <h2 className="text-2xl font-semibold text-purple-700 mb-6">
          Secure. Fast. Trusted.
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Empowering Democracy with AI-Powered Face Verification for a
          Transparent Voting Process.
        </p>

        <button
          onClick={handleStart}
          className="px-8 py-3 text-white bg-purple-600 hover:bg-purple-700 transition-all duration-200 rounded-xl shadow-lg text-lg"
        >
          Start Face Verification
        </button>
      </div>
    </div>
  );
};

export default Home;
