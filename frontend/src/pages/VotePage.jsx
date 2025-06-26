import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function VotePage() {
  const [userData, setUserData] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const candidates = [
    {
      id: "bjp",
      name: "Narendra Modi",
      party: "Bharatiya Janata Party",
      image: "/candidate-images/modi.jpg",
      symbolImage: "/candidate-images/bjp.png",
    },
    {
      id: "inc",
      name: "Rahul Gandhi",
      party: "Indian National Congress",
      image: "/candidate-images/rahul.jpg",
      symbolImage: "/candidate-images/congress.png",
    },
    {
      id: "aap",
      name: "Arvind Kejriwal",
      party: "Aam Aadmi Party",
      image: "/candidate-images/kejriwal.jpg",
      symbolImage: "/candidate-images/aap.png",
    },
    {
      id: "bsp",
      name: "Mayawati",
      party: "Bahujan Samaj Party",
      image: "/candidate-images/mayawati.jpg",
      symbolImage: "/candidate-images/bsp.png",
    },
  ];

  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) setUserData(JSON.parse(stored));
  }, []);

  const handleVoteSubmit = async () => {
    if (!selectedCandidate) {
      setMessage("Please select a candidate.");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:5002/api/submit-vote", {
        voter_id: userData.voter_id,
        candidate: selectedCandidate,
      });

      if (res.data.status === "success") {
        setMessage("✅ Vote submitted successfully!");
        const votedCandidate = candidates.find(
          (c) => c.name === selectedCandidate
        );

        setTimeout(() => {
          navigate("/vote-success", {
            state: {
              user: userData,
              candidate: votedCandidate,
              time: new Date().toLocaleString(),
            },
          });
        }, 1500);
      } else {
        setMessage(res.data.message || "Something went wrong.");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMessage("❌ You have already voted.");

        const votedCandidate = candidates.find(
          (c) => c.name === selectedCandidate
        );

        setTimeout(() => {
          navigate("/vote-success", {
            state: {
              user: userData,
              candidate: votedCandidate,
              time: new Date().toLocaleString(),
            },
          });
        }, 1500);
      } else {
        setMessage("❌ Vote failed. Try again.");
      }

      console.error("Vote Error:", error);
    }
  };

  if (!userData) {
    return (
      <div className="p-6 text-center text-red-600 text-lg font-semibold">
        No user data found. Please verify first.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded-xl shadow-lg bg-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        🗳️ Cast Your Vote
      </h2>

      <div className="mb-6 text-center">
        <img
          src={userData.imageURL}
          alt="User"
          className="w-24 h-24 rounded-full mx-auto mb-2 object-cover border-2 border-blue-500"
        />
        <p>
          <strong>Name:</strong> {userData.name}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
        <p>
          <strong>Address:</strong> {userData.address}
        </p>
      </div>

      <div className="flex flex-col gap-6 mb-8">
        {candidates.map((candidate) => {
          const isSelected = selectedCandidate === candidate.name;
          return (
            <div
              key={candidate.id}
              className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border rounded-xl shadow-md transition ${
                isSelected
                  ? "ring-2 ring-blue-600 bg-blue-50"
                  : "hover:ring-1 hover:ring-gray-300"
              }`}
            >
              <img
                src={candidate.image}
                alt={candidate.name}
                className="w-28 h-28 rounded-full object-cover border"
              />
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-semibold">{candidate.name}</h3>
                <p className="text-gray-600">{candidate.party}</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <img
                  src={candidate.symbolImage}
                  alt={`${candidate.party} Symbol`}
                  className="w-20 h-20 object-contain"
                />
                {isSelected && (
                  <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    ✅ Selected
                  </span>
                )}
              </div>
              <div
                onClick={() => setSelectedCandidate(candidate.name)}
                className={`w-10 h-10 flex items-center justify-center border-2 rounded-md cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "bg-green-600 border-green-700"
                    : "border-gray-400"
                }`}
              >
                {isSelected && (
                  <span className="text-white text-xl font-bold">✔</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleVoteSubmit}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg text-lg"
      >
        Submit Vote
      </button>

      {message && (
        <p className="mt-6 text-center text-xl font-medium text-green-700">
          {message}
        </p>
      )}
    </div>
  );
}
