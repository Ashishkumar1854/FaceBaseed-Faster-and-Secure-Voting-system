import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data;

  if (!data) {
    return (
      <p className="text-red-600">No user data found. Please verify again.</p>
    );
  }

  const { name, voter_id, address, imagePath, email, _id } = data;

  const handleGoToVote = () => {
    const userData = { name, voter_id, address, imagePath, email, _id };
    localStorage.setItem("userData", JSON.stringify(userData));
    navigate("/vote");
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Voter Details</h2>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Voter ID:</strong> {voter_id}
      </p>
      <p>
        <strong>Address:</strong> {address}
      </p>
      {imagePath && (
        <div className="mt-2">
          <img
            src={`http://localhost:5002/uploads/${imagePath}`}
            alt="Voter"
            className="w-48 h-48 rounded"
          />
        </div>
      )}
      <button
        onClick={handleGoToVote}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Go to Vote
      </button>
    </div>
  );
};

export default ResultsPage;
