import React, { useEffect, useState, useContext } from "react";
import getUserInfo from '../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";


// Here, we display our Navbar
export default function Navbar() {

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [show, setShow] = useState(false); // State for modal visibility

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);



  const handleLogout = () => {
    localStorage.clear();  // Clear authentication tokens
    setUser(null);  // Update global user state
    navigate("/");  // Redirect to home
    handleClose();
  };


  if (!user) {
    return null;
  }


  return (
    <ReactNavbar bg="dark" variant="dark">
      <Container className="d-flex justify-content-between align-items-center">
        <Nav className="me-auto">
          <Nav.Link href="/privateUserProfile">Home</Nav.Link>
          <Nav.Link href="/tutorialPage">Tutorial</Nav.Link>
          <Nav.Link href="/gamePage">New Game</Nav.Link>
        </Nav>

        {user && (
          <button
            onClick={handleShow}
            className="btn btn-danger"
          >
            Log Out
          </button>
          
        )}
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
      </Container>
    </ReactNavbar>

    

  );
};