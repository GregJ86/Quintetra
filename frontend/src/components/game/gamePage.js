import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './cardgame.css';
import getUserInfo from "../../utilities/decodeJwt";




const CardGame = () => {

  const navigate = useNavigate();

  const handleEndGameClick = async () => {

    const currentPoints = window.gameState.getPoints() ?? 0;
    console.log("Current points at end game:", currentPoints);

    const userInfo = getUserInfo();
    if (!userInfo || !userInfo.username) {
      alert("You must be logged in to save your high score.");
      return;
    }

    let prevGold = 0;
    try {
      const goldGetResponse = await fetch(
        `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/gold/${userInfo.username}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!goldGetResponse.ok) throw new Error(`GET gold failed: ${goldGetResponse.status}`);

      const goldGetData = await goldGetResponse.json();
      prevGold = goldGetData.gold;
      console.log("Previous total gold:", prevGold);
    } catch (err) {
      console.error("Failed to fetch previous gold:", err);
      alert("Error retrieving current gold. Please try again.");
      return;
    }

    //updating high score at the end of the game
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/highscore/${userInfo.username}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            newHighScore: currentPoints,
          }),
        }
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      console.log(`High score: ${data.highScore}`);
    } catch (err) {
      console.error("Failed to update high score:", err);
      alert("Error updating high score. Please try again.");
    }

    //updating total gold won after end of the game
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/gold/${userInfo.username}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            newGold: currentPoints,
          }),
        }
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      console.log(`Gold: ${data.gold}`);

      //update player level at end of the game
      const newGold = data.gold;

      console.log(`Previous gold: ${prevGold}`);
      console.log(`New gold: ${newGold}`);

      const prevLevelCheck = Math.floor(prevGold / 5000);
      const newLevelCheck = Math.floor(newGold / 5000);
      const levelIncrease = newLevelCheck - prevLevelCheck;

      console.log(`Level increase: ${levelIncrease}`);




      if (levelIncrease > 0) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/level/${userInfo.username}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                newLevel: levelIncrease,
              }),
            }
          );

          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

          const data = await response.json();
          console.log(`New level: ${data.level}`);

        } catch (err) {
          console.error("Failed to update level:", err);
          alert("Error updating level. Please try again.");
        }


      }
    } catch (err) {
      console.error("Failed to update gold:", err);
      alert("Error updating gold. Please try again.");
    }

    //return to home page
    navigate('/privateUserProfile');

  };

  useEffect(() => {
    // Dynamically import your scripts after the component mounts
    const loadScripts = () => {
      const scripts = [
        './animations.js',
        './gameLogic.js',
        './cardgame.js',
      ];

      scripts.forEach((src) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        document.body.appendChild(script);
      });
    };

    loadScripts();

    return () => {
      // Clean up the scripts when the component unmounts
      const scripts = document.querySelectorAll('script[src]');
      scripts.forEach((script) => script.remove());
    };
  }, []);

  return (
    <div className="bg-green-200 min-h-screen bg-gray-100">
      <h1 id="title">Quintétre</h1>
      <div className="window">
        <div className="table">
          <div className="bonus">
            <div className="bonusCards">
              {[0, 1, 2, 3, 4].map((index) => (
                <div key={index} id={`bonus${index}`} className="bonusZone">
                  <img src="/cards/BACK.png" alt={`bonus-${index}`} />
                </div>
              ))}
            </div>

            <div className="bonusButtons">
              <button id="bonusButton">Exit</button>
              <input type="number" id="wager" min="0" />
              <button id="wagerButton">Wager</button>
            </div>
          </div>

          <div className="newGameWindow">
            <p>Would you like to <br />start a new game?</p>
            <div className="restartButtons">
              <button id="ngStartButton">Yes</button>
              <button id="ngCancelButton">No</button>
            </div>
          </div>

          <div className="quitGameWindow">
            <p>Are you sure that<br />you want to quit?</p>
            <div className="restartButtons">
              <button id="quitConfirmButton" onClick={handleEndGameClick}>Yes</button>
              <button id="quitCancelButton">No</button>
            </div>
          </div>

          <div className="topGrid">
            <div id="deck">
              <img src="./cards/BACK.png" alt="deck of cards" />
            </div>

            <div id="dropZones">
              {[0, 1, 2, 3, 4].map((index) => (
                <div key={index} id={`play${index}`} className="dropZone"></div>
              ))}
              <div id="score">Gold:</div>
              <div id="cardsLeft"></div>


            </div>
          </div>

          <div className="buttons">
            <button id="button">Meld</button>
            <button id="reset">Undo</button>
            <button id="endgame">Quit</button>
            <button id="newgame">New</button>
          </div>

          <div className="bottomGrid">
            <div id="discard">
              <img src="./cards/J-Z.png" alt="discard zone" />
            </div>

            <div id="hand">
              {[0, 1, 2, 3, 4].map((index) => (
                <div key={index} id={`card${index}`} className="card" draggable="true"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardGame;
