import React, { useState } from "react";


const TutorialPage = () => {
    const tutorialSteps = [
        {
            image: "/images/tutorial1.png",
            text: `Welcome to Quintétre — a fast-paced card game where the goal is simple: craft as much gold as possible by melding your best cards.
                
            You can also try your luck with betting to earn even more gold!
        Let’s break it down step-by-step.`,
        },
        {
            image: "/images/tutorial2.png",
            text: `In Quintétre, you craft gold by "melding" sets of cards together.
        What is a meld?
        A meld is a set 2, 3, 4, or 5 cards. 
        Valid melds include:
            2 cards:  Pair. (2 cards of same face value) 
            3 cards:  3 of a kind. (3 cards of same face value)
            4 cards: 2 pair, 4 of a kind.
            5 cards (Quintets): Full house (pair and 3 of a kind)
            Flush (all cards same suit), 
            Straight (all cards ascending face value),
            Straight flush (all cards ascending value AND same face value).
            Royal flush (straight flush of 10, J, Q, K, A.)
            You might be familiar with these combinations if you've played poker.
            
            To play a meld, simply drag the cards from your hand to the dropzones above,
            and then hit the meld button to craft your gold!`,
        },
        {
            image: "/images/tutorial3.png",
            text: `What do I do if I don't have a meld in my hand?
            If you don't have a valid meld yet, simply discard a card by dragging
            an unwanted card to the discard zone, and you will be dealt a new card.
            
            However, be strategic which cards you discard, as you may miss out on a 
            high scoring meld if you discard valuable cards, think before discarding!`,
        },
        {
            image: "/images/tutorial4.png",
            text: `After you successfully play a meld for some gold, you will then
            have the option to boost the gold you just crafted.
            
            Enter an amount of gold you want to wager, and pick 1 of the 5 facedown cards.

        - 🃏 Joker = lose your bet
        - ♣️ Club = break even
        - ♥️ Heart = 2x
        - ♦️ Diamond = 5x
        - ♠️ Spade = 10x
        
        If you want to play it safe, the boosting wager is optional.
        If you're feeling lucky go all in, but be careful for the Joker!`,
        },
        {
            image: "/images/tutorial5.png",
            text: `Now let's talk about how much gold you earn when you meld cards.
            
            Each card you play has a base gold value:

        - 2–9 = 5 gold
        - 10, J, Q, K = 10 gold
        - Ace = 15 gold
        
        The base value is then multiplied by the amount of cards melded at once:
        - 2 card melds = 2X gold
        - 3 card melds = 3X gold
        - 4 card melds = 4X gold
        - Quintets = 5X gold `
        
        ,
        }
        
    ];

    const [stepIndex, setStepIndex] = useState(0);
    const [tutorialComplete, setTutorialComplete] = useState(false);

    const goNext = () => {
        if (stepIndex < tutorialSteps.length - 1) {
            setStepIndex(stepIndex + 1);
        } else {
            setTutorialComplete(true);
        }
    };

    const goPrev = () => {
        if (stepIndex > 0) {
            setStepIndex(stepIndex - 1);
        }
    };

    if (tutorialComplete) {
        return (
            <div style={{ textAlign: "center" }}>
                <h2>You're ready to play!</h2>
                <button onClick={() => (window.location.href = "/gamePage")}>
                    Start Game
                </button>
            </div>
        );
    }

    const { image, text } = tutorialSteps[stepIndex];

    return (
        <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
            <h2>How to Play</h2>
            <img
                src={image}
                alt={`Step ${stepIndex + 1}`}
                style={{ width: "100%", maxHeight: "300px", objectFit: "contain" }}
            />
            <div
                style={{
                    textAlign: "left",
                    padding: "1rem",
                    whiteSpace: "pre-line",
                }}
                dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, "<br />") }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button onClick={goPrev} disabled={stepIndex === 0}>
                    Previous
                </button>
                <button onClick={goNext}>
                    {stepIndex === tutorialSteps.length - 1 ? "Finish" : "Next"}
                </button>
            </div>
        </div>
    );
};

export default TutorialPage;