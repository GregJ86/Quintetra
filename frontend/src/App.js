import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import './css/card.css';
import './index.css';

// We import all the components we need in our app

import GamePage from "./components/game/gamePage";
import Navbar from "./components/navbar";
import LandingPage from "./components/pages/landingPage";
import HomePage from "./components/pages/homePage";
import Login from "./components/pages/loginPage";
import Signup from "./components/pages/registerPage";
import PrivateUserProfile from "./components/pages/privateUserProfilePage";
import { createContext, useState, useEffect } from "react";
import getUserInfo from "./utilities/decodeJwt";

export const UserContext = createContext();
//test change
//test again
const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  return (
    <>
      
      <UserContext.Provider value={{user, setUser}}>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="/privateUserProfile" element={<PrivateUserProfile />} />
          <Route exact path = "/gamePage" element ={<GamePage/>} />




        </Routes>
      </UserContext.Provider>
    </>
  );
};



export default App
