import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../../utilities/decodeJwt";

const PrivateUserProfile = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // Handle log out button
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  if (!user) return (<div><h4>Log in to view this page.</h4></div>);

  return (
    <div className="bg-green-200 flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        {/* Profile Username */}
        <h1 className="text-3xl font-semibold text-center mb-6">{user.username}</h1>

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
