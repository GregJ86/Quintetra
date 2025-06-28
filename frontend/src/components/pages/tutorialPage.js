import React, { useState } from "react";


const TutorialPage = () => {
    const tutorialSteps = [
        {
            //image: "/images/tutorial-intro.png",
            text: `Welcome to **Quintetra** — a fast-paced card game where the goal is simple: **craft as much gold as possible** by melding your best cards!

        A meld is when you play multiple cards together in a set — like a pair, three-of-a-kind, or a straight. The better the meld, the more gold you earn!

        Let’s break it down step-by-step.`,
        },
        {
            //image: "/images/tutorial-meld.png",
            text: `In **Quintetra**, a **meld** is a group of cards played together in a pattern — like pairs, triples, or even a royal flush.

        The more cards you meld at once, the bigger the multiplier you’ll get!`,
        },
        {
            //image: "/images/tutorial-gold-values.png",
            text: `Each card you play in a meld adds gold based on its value:

        - 2–9 = **5 gold**
        - 10, J, Q, K = **10 gold**
        - Ace = **15 gold**`,
        },
        {
            //image: "/images/tutorial-multipliers.png",
            text: `Your meld size determines your gold multiplier:

        - Pair = x2
        - 3 of a Kind = x3
        - 4 of a Kind, 2 pair = x4
        - Quintet (Straight, Flush, Royal Flush)= x5`,
        },
        {
            //image: "/images/tutorial-boost.png",
            text: `After a meld, you can **boost** your gold — or play it safe.

        Wager gold and pick 1 of 5 facedown cards. Results:

        - 🃏 Joker = lose your bet
        - ♣️ Club = break even
        - ♥️ Heart = 2x
        - ♦️ Diamond = 5x
        - ♠️ Spade = 10x`,
        },
        {
            //image: "/images/tutorial-discard.png",
            text: `Need better cards? Discard any card and draw a new one.

        Be strategic — smart discards lead to powerful melds!`,
        },
        {
            //image: "/images/tutorial-end-round.png",
            text: `After each meld:

        - Unplayed cards return to the deck
        - You draw a new hand
        - Keep melding until the deck runs out!

        🏆 Try to score the most gold!`,
        },
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
            <h2>Quintetra Tutorial</h2>
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