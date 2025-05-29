import React, { useEffect } from 'react';
import './cardgame.css';  

const CardGame = () => {
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
      <h1 id="title">Quintetra</h1>
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
              <button id="bonusButton">back to game</button>
              <input type="number" id="wager" min="0" />
              <button id="wagerButton">wager gold</button>
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
            <button id="button">meld cards</button>
            <button id="reset">reset cards</button>
            <button id="endgame">end game</button>
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
