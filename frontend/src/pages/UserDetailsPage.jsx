import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const UserDetailsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = state || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/vote", { state: { user } });
    }, 5001);
    return () => clearTimeout(timer);
  }, [navigate, user]);

  if (!user) return <div className="text-center p-6">❌ No user found</div>;

  return (
    <div className="text-center mt-8">
      <h2 className="text-2xl font-bold mb-4">✅ Face Verified</h2>
      <img
        src={user.imagePath}
        alt="User"
        className="w-32 h-32 mx-auto rounded-full shadow-md mb-4"
      />
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Address:</strong> {user.address}
      </p>
    </div>
  );
};

export default UserDetailsPage;
