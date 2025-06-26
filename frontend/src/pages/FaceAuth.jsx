import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FaceAuth = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showVoteButton, setShowVoteButton] = useState(false);
  const navigate = useNavigate();

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setResult(null);
    setShowVoteButton(false);
  };

  const retake = () => {
    setCapturedImage(null);
    setResult(null);
    setUserData(null);
    setShowVoteButton(false);
  };

  const uploadImage = async () => {
    if (!capturedImage) return;
    setLoading(true);

    try {
      const file = dataURLtoFile(capturedImage, "captured_image.jpg");
      const formData = new FormData();
      formData.append("file", file);

      console.log("Uploading file for verification:", file);

      const response = await axios.post(
        "http://127.0.0.1:5002/api/verify", // 🔁 changed from /api/upload to /api/verify
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { data } = response;
      console.log("Verification API response:", data);

      if (data.status === "success") {
        const user = data.user_data || data.user;
        setResult({ success: true, message: data.message });

        if (user) {
          setUserData(user);
          setTimeout(() => setShowVoteButton(true), 3000);
        } else {
          console.warn("No user data returned.");
        }
      } else {
        setResult({ success: false, message: data.message });
      }
    } catch (error) {
      console.error("Verification failed:", error);
      setResult({ success: false, message: "Invalid User." });
    } finally {
      setLoading(false);
    }
  };

  const handleVoteRedirect = () => {
    if (userData) {
      //  Construct userData with full image URL to pass to vote page
      const userDataWithImage = {
        ...userData,
        imageURL: `http://127.0.0.1:5002/uploads/${userData.imagePath}`,
      };

      //  Save the complete data (including full image URL) to localStorage
      localStorage.setItem("userData", JSON.stringify(userDataWithImage));

      //  Navigate to the vote page
      navigate("/vote");
    } else {
      console.error("User data missing.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {!capturedImage ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="rounded-xl shadow-lg"
          />
          <button
            onClick={capture}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            Capture
          </button>
        </>
      ) : (
        <>
          <img
            src={capturedImage}
            alt="Captured"
            className="w-64 h-64 object-cover rounded-xl shadow-md"
          />
          <div className="mt-4 space-x-4">
            <button
              onClick={retake}
              className="px-6 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700"
            >
              Retake
            </button>
            <button
              onClick={uploadImage}
              className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Confirm & Verify"}
            </button>
          </div>

          {result && (
            <div className="mt-6 p-4 rounded-xl shadow-md bg-white text-center">
              {result.success ? (
                <>
                  <p className="text-green-600 text-lg font-semibold">
                    ✅ {result.message}
                  </p>
                  {userData && (
                    <div className="mt-2 text-gray-700">
                      <p className="text-lg">Welcome, {userData.name}</p>
                      <p className="text-sm">Voter ID: {userData.voter_id}</p>
                      <p className="text-sm">Address: {userData.address}</p>
                      {userData.imagePath && (
                        <img
                          src={`http://127.0.0.1:5002/uploads/${userData.imagePath}`}
                          alt="Verified User"
                          className="mt-2 w-32 h-32 object-cover rounded-full mx-auto"
                        />
                      )}
                    </div>
                  )}
                  {showVoteButton && (
                    <button
                      onClick={handleVoteRedirect}
                      className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
                    >
                      Go to Vote
                    </button>
                  )}
                </>
              ) : (
                <p className="text-red-600 text-lg font-semibold">
                  ❌ {result.message}
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FaceAuth;
