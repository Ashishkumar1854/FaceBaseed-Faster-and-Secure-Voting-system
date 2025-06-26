import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const VerifiedUser = () => {
  const { userId } = useParams(); // Get userId from route URL
  const [user, setUser] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get user info (name, address, image)
        const userRes = await axios.get(`/api/users/${userId}`);
        setUser(userRes.data.user);

        // Check vote status
        const voteRes = await axios.get(`/api/users/check-vote/${userId}`);
        setHasVoted(voteRes.data.voted);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user:", err);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleVote = () => {
    navigate("/vote");
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">🎉 Verified User</h2>
      <img
        src={`/images/${user.image}`} // from frontend/public/images
        alt="User"
        className="w-32 h-32 object-cover mx-auto rounded-full mb-4"
      />
      <p className="text-center mb-2">👤 Name: {user.name}</p>
      <p className="text-center mb-4">🏠 Address: {user.address}</p>

      {!hasVoted ? (
        <button
          onClick={handleVote}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          ✅ Go to Vote
        </button>
      ) : (
        <p className="text-center text-red-600 font-semibold">
          ❌ You have already voted
        </p>
      )}
    </div>
  );
};

export default VerifiedUser;
