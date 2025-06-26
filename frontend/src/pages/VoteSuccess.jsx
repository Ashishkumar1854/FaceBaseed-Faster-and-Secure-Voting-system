import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VoteSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, candidate, time } = location.state || {};
  const [voteTime, setVoteTime] = useState(time || "");

  useEffect(() => {
    if (!voteTime) {
      const now = new Date();
      const formatted = now.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour12: true,
      });
      setVoteTime(formatted);
    }

    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, voteTime]);

  if (!user || !candidate) {
    return (
      <div className="text-center mt-20 text-red-600 text-xl">
        Missing data. Please vote again.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        ✅ Vote Submitted Successfully!
      </h2>

      {/* User Info */}
      <img
        src={user.imageURL}
        alt="Voter"
        className="w-20 h-20 rounded-full mx-auto border mb-2"
      />
      <p className="mb-2">
        <strong>Name:</strong> {user.name}
      </p>
      <p className="mb-2">
        <strong>Address:</strong> {user.address}
      </p>

      {/* Candidate Info */}
      <p className="mb-2">
        <strong>Voted For:</strong> {candidate.name}
      </p>
      <img
        src={candidate.symbolImage}
        alt="Candidate Symbol"
        className="w-20 h-20 mx-auto my-4"
      />

      {/* Vote Time */}
      <p className="mb-2 text-sm">
        <strong>Vote Time:</strong> {voteTime}
      </p>

      <p className="text-sm text-gray-500 mt-2">
        Redirecting to homepage in 5 seconds...
      </p>
    </div>
  );
};

export default VoteSuccess;
