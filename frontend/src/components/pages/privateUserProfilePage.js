import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../../utilities/decodeJwt";

const PrivateUserProfile = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const [highScore, setHighScore] = useState(null);
  const navigate = useNavigate();

  // Handle log out button
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const userInfo = getUserInfo();
    setUser(userInfo);
     


    if (userInfo && userInfo.username) {
      fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/user/highscore/${userInfo.username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched high score data:", data);  // Should show { highScore: 0 }
        setHighScore(data.highScore);
      })
      .catch(error => console.error("Error fetching high score:", error));
    }

  }, []);

  if (!user || !user.username) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Welcome to Your Profile Page
        </h2>
        <p className="mb-6 text-center max-w-md">
          This is the page where you can view your profile if you're logged in.
          Please sign up or try a quick play!
        </p>
        <div className="flex space-x-4">
          {/* Sign Up Link */}
          <div className="mb-4 w-full">
            <a href="/signup" className="flex justify-center items-center text-3xl text-blue-500 hover:text-blue-700">Sign Up</a>
          </div>
          {/* Quick Play Link */}
          <div className="w-full">
            <a href="/gamePage" className="flex justify-center items-center text-3xl text-blue-500 hover:text-blue-700">Quick Play</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-green-200 flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        {/* Profile Username */}
        <h1 className="text-3xl font-semibold text-center mb-6">{user.username}</h1>

        {/* High Score Section */}
        <h2 className="text-xl text-center font-semibold mb-4">
          High Score: {highScore}
        </h2>


        {/* Log Out Button */}
        <div className="flex justify-center">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300"
            onClick={handleShow}
          >
            Log Out
          </button>
        </div>

        {/* Modal */}
        {show && (
          <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-2xl font-semibold mb-4 text-center">Log Out</h2>
              <p className="mb-4 text-center">Are you sure you want to Log Out?</p>
              <div className="flex justify-around">
                <button
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                  onClick={handleLogout}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivateUserProfile;
