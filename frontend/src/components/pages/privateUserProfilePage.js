import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../../utilities/decodeJwt";
import { UserContext } from "../../App";

const PrivateUserProfile = () => {
  const [show, setShow] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [highScore, setHighScore] = useState(null);
  const [gold, setGold] = useState(null);
  const [level, setLevel] = useState(null);
  const [icon, setIcon] = useState(null);


  const navigate = useNavigate();


  // Handle log out button
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
  };

  const [showIconModal, setShowIconModal] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);

  const iconOptions = ["jack.png", "king.png", "queen.png"];

  const handleSetIcon = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/icon/${user.username}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newIcon: selectedIcon }),
        }
      );

      if (!response.ok) throw new Error("Failed to update icon");

      const data = await response.json();

      setUser(prev => ({ ...prev, icon: data.icon }));
      setIcon(data.icon);
      setShowIconModal(false);
    } catch (error) {
      console.error("Error updating icon:", error);
    }
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
          console.log("Fetched high score data:", data);
          setHighScore(data.highScore);
        })
        .catch(error => console.error("Error fetching high score:", error));

      fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/user/gold/${userInfo.username}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log("Fetched gold data:", data);
          setGold(data.gold);
        })
        .catch(error => console.error("Error fetching gold:", error));

      fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/user/level/${userInfo.username}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log("Fetched level data:", data);
          setLevel(data.level);
        })
        .catch(error => console.error("Error fetching level:", error));
    

    fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/user/icon/${userInfo.username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched icon data:", data);
        setIcon(data.icon);
      })
      .catch(error => console.error("Error fetching icon:", error));
    }

  }, []);

  if (!user || !user.username) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Welcome to Quintétre!
        </h2>
        <p className="mb-6 text-center max-w-md">
          Sign up or log in to view your game progress!
          <br></br>
          Not interested? Try a quick play!
        </p>
        <div className="flex space-x-4">
          {/* Sign Up Link */}
          <div className="mb-4 w-full">
            <button
              onClick={() => navigate("/signup")}
              className="flex justify-center items-center text-2xl bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded-md"
            >
              Signup
            </button>

          </div>
          {/* Login Link */}
          <div className="mb-4 w-full">
            <button
              onClick={() => navigate("/login")}
              className="flex justify-center items-center text-2xl bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded-md"
            >
              Login
            </button>
          </div>
          {/* Quick Play Link */}
          <div className="w-full">
            <button
              onClick={() => (window.location.href = "/gamePage")}
              className="flex justify-center items-center text-2xl bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded-md"
            >
              Play
            </button>
          </div>
          {/* Tutorial Link */}
          <div className="w-full">
            <button
              onClick={() => (window.location.href = "/tutorialPage")}
              className="flex justify-center items-center text-2xl bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded-md"
            >
              Tutorial
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (

    <div className="bg-green-200 flex justify-center items-center min-h-screen bg-gray-100">

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">

        {/* Player Icon */}

        <img
          src={icon}
          alt="User Icon"
          className="mx-auto mb-4 w-24 h-24 rounded-full border-4 border-green-500"
        />

        {/* Edit Icon */}
        <button
          onClick={() => setShowIconModal(true)}
          className="block mx-auto mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Edit Icon
        </button>

        {/* Profile Username */}
        <h1 className="text-3xl font-semibold text-center mb-6">{user.username}</h1>

        {/* Level Section */}
        <h2 className="text-xl text-center font-semibold mb-4">
          Level: {level}
        </h2>

        {/* High Score Section */}
        <h2 className="text-xl text-center font-semibold mb-4">
          High Score: {highScore}
        </h2>

        {/* Gold Section */}
        <h2 className="text-xl text-center font-semibold mb-4">
          Gold: {gold}
        </h2>




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

        {showIconModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4 text-center">Choose Your Icon</h2>
              <div className="flex flex-wrap justify-center gap-4 mb-4">
                {iconOptions.map((icon) => (
                  <img
                    key={icon}
                    src={icon}
                    alt={icon}
                    onClick={() => setSelectedIcon(icon)}
                    className={`w-16 h-16 rounded-full cursor-pointer border-4 ${selectedIcon === icon ? "border-blue-500" : "border-transparent"
                      } hover:border-blue-300 transition duration-200`}
                  />
                ))}
              </div>
              <div className="flex justify-around">
                <button
                  onClick={() => setShowIconModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSetIcon}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Set Icon
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
