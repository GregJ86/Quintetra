var deck = [];
var hand = [];
var playedCard = [];
var bonusDeck = [];
var bonusHand = [];
var points = 0;

const cards = document.querySelectorAll('.card');
const dropZones = document.querySelectorAll('.dropZone');
const bonusZones = document.querySelectorAll('.bonusZone');
const deckElement = document.getElementById("deck");
const scoreButton = document.getElementById("button");
const resetButton = document.getElementById("reset");
const bonusButton = document.getElementById("bonusButton");
const bonus = document.querySelector('.bonus');
const wagerButton = document.getElementById("wagerButton");
const discardZone = document.getElementById("discard");
const totalScore = document.getElementById("score");
const cardsLeft = document.getElementById("cardsLeft");
const wagerInput = document.getElementById('wager');
const endGameButton = document.getElementById('endgame');

var startXDeck = 0;
var startYDeck = 0;

const cardSlots = [];
const cardPositions = [];

window.gameState = window.gameState || {};
window.gameState.getPoints = () => points;

window.onload = function () {
    buildDeck();
    shuffleDeck();
    dealCards();
    startingPos();
    initializeDragDropEvents();
    console.log(deck);
}

/* prevents user from leaving page in the middle of a game

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
});

leave as a comment during testing*/

///////////////////////////////////////////////////////////
function initializeDragDropEvents() {
    cards.forEach((card, index) => {
        card.addEventListener('dragstart', (e) => {
            let cardValue = hand[index];
            e.dataTransfer.setData('text', card.id);
            e.dataTransfer.setData('handValue', cardValue);
            console.log("Dragging card:", cardValue);
        });
    });

    dropZones.forEach(dropZone => {
        dropZone.addEventListener("dragover", (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });

        dropZone.addEventListener('dragleave', function () {
            dropZone.classList.remove('dragover');
        });

        dropZone.addEventListener("drop", (e) => {
            e.preventDefault();

            dropZone.classList.remove('dragover');
            const dropId = e.dataTransfer.getData("text");
            const drop = document.getElementById(dropId);
            const cardValue = e.dataTransfer.getData('handValue');
            const cardSlot = drop;

            if (!cardSlot) return;

            const cardImage = cardSlot.querySelector("img");
            if (cardImage) {

                const cardValue = cardImage.dataset.handValue;

                const cardIndex = hand.indexOf(cardValue);

                if (cardIndex !== -1) {
                    hand[cardIndex] = 'played';
                    console.log("Hand after play (with dummy):", hand);
                }

            }

            if (!dropZone.querySelector('img')) {
                const cardImage = cardSlot.querySelector("img")
                dropZone.appendChild(cardImage);
                playedCard.push(cardValue);
                console.log("Played cards:", playedCard);
            }
        });
    });
}
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
discardZone.addEventListener("dragover", (e) => {
    e.preventDefault();
});
discardZone.addEventListener("drop", (e) => {
    e.preventDefault();

    if (deck.length > 0) {
        const dropId = e.dataTransfer.getData("text/plain");
        const drop = document.getElementById(dropId);
        const cardSlot = drop;

        if (!cardSlot) return;


        const cardImage = cardSlot.querySelector("img");
        if (cardImage) {

            const cardValue = cardImage.dataset.handValue;

            const cardIndex = hand.indexOf(cardValue);

            if (cardIndex !== -1) {
                hand[cardIndex] = 'discarded';
                console.log("Hand after discard (with dummy):", hand);
            }

            cardSlot.removeChild(cardImage);
        }

        const newCard = deck.pop();
        const newCardImg = document.createElement("img");
        newCardImg.src = `./cards/${newCard}.png`;
        newCardImg.dataset.handValue = newCard;

        cardSlot.appendChild(newCardImg);

        const cardIndex = hand.indexOf('discarded');
        if (cardIndex !== -1) {
            hand[cardIndex] = newCard;
        }

        cardsLeft.textContent = "Deck: " + deck.length

        console.log("Hand after new card dealt:", hand);
       
    } else {
        alert("No cards left in the deck!");
    }



});
////////////////////////////////////////////////////////////////
scoreButton.addEventListener("click", () => {


    bonus.style.display = 'grid';
    const handResult = evaluateHand(playedCard);
    totalScore.textContent = "Gold: " + points;
    wagerInput.value = 0;
    wagerInput.max = points;
    console.log("Hand Result:", handResult);
    console.log(points);
    playedCard = [];

    buildBonusDeck();
    shuffleBonusDeck();
    dealBonusCards()
    console.log(bonusHand);
});

resetButton.addEventListener("click", () => {

    resetCards();
    clearDrops();
    console.log(playedCard);
    console.log(hand);

});

bonusButton.addEventListener("click", () => {
    bonus.style.display = 'none';
    bonusHand = [];
    wagerInput.value = 0;
    totalScore.textContent = "Gold: " + points;
    resetBonusCardImg();
    resetPositions();
    clearDrops();
    dealAnimation(dealNewCards);

});

wagerButton.addEventListener("click", () => {

    bonusZones.forEach(bonusZone => {
        bonusZone.addEventListener("click", () => {

            for (let i = 0; i < bonusHand.length; i++) {
                if (bonusZone.id == "bonus" + i) {
                    bonusIndex = i;
                    console.log(i);

                    let bonus = bonusHand[i];
                    console.log(bonus);
                    let bonusImg = document.createElement("img");
                    bonusImg.src = "./cards/" + bonus + ".png";
                    bonusZone.innerHTML = "";
                    document.getElementById("bonus" + i).appendChild(bonusImg);
                    bonusHand = [];

                    const wagerAmount = parseInt(wagerInput.value, 10);
                    console.log(wagerAmount)

                    console.log(points)

                    switch (bonus) {
                        case "Z-1":
                            points = points + (5 * wagerAmount);
                            break;
                        case "Z-2":
                            points = points + (2 * wagerAmount);
                            break;
                        case "Z-3":
                            points = points
                            break;
                        case "Z-4":
                            points = points - Math.ceil(0.5 * wagerAmount);
                            break;
                        case "Z-5":
                            points = points - wagerAmount;
                            break;
                    }

                }

            }

        })
    })

});

function resetBonusCardImg() {
    bonusZones.forEach(bonusZone => {
        let bonusImg = document.createElement("img");
        bonusImg.src = "./cards/back.png";
        bonusZone.innerHTML = "";
        bonusZone.appendChild(bonusImg);

    });
};


////////////////////////////////////////////////////////////////
function resetPositions() {
    for (let i = 0; i < cardSlots.length; i++) {
        const cardSlot = cardSlots[i];
        const position = cardPositions[i];

        cardSlot.style.position = "absolute";
        cardSlot.style.left = position.x + "px";
        cardSlot.style.top = position.y + "px";
        cardSlot.innerHTML = " ";

    }
}
function resetCards() {
    playedCard.forEach(card => {

        
        const replaceCard = card;
        const newCardImg = document.createElement("img");
        newCardImg.src = `./cards/${replaceCard}.png`;
        newCardImg.dataset.handValue = replaceCard;

        for (let i = 0; i < hand.length; i++) {

            if (!document.getElementById("card" + i).children.length > 0) {
                document.getElementById("card" + i).appendChild(newCardImg);
                hand[i] = replaceCard;

            }
        }
        playedCard = [];
    })
}
function clearDrops() {
    dropZones.forEach(dropZone => {
        dropZone.innerHTML = '';
    })
}
//////////////////////////////////////////////////////////////////
function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];


    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]);
        }
    }
}

function buildBonusDeck() {
    let value = "Z";
    let types = ["1", "2", "3", "4", "5"];

    for (let i = 0; i < types.length; i++) {
        bonusDeck.push(value + "-" + types[i]);
    }
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }

}

function shuffleBonusDeck() {
    for (let i = 0; i < bonusDeck.length; i++) {
        let j = Math.floor(Math.random() * bonusDeck.length);
        let temp = bonusDeck[i];
        bonusDeck[i] = bonusDeck[j];
        bonusDeck[j] = temp;
    }

}

function dealCards() {

    let numCards = Math.min(deck.length, 5);

    if (numCards > 0) {
       
        for (let i = 0; i < numCards; i++) {
            let card = deck.pop();
            let cardImg = document.createElement("img");
            hand.push(card);
            cardImg.src = "./cards/" + card + ".png";
            cardImg.dataset.handValue = card;

            document.getElementById("card" + i).appendChild(cardImg);

        }
        console.log(hand);
        console.log(deck);
        cardsLeft.textContent = "Deck: " + deck.length
    } else if (numCards == 0) {
        alert("No cards left in the deck!");
       
    }
}

function dealBonusCards() {

    for (let i = 0; i < 5; i++) {
        let card = bonusDeck.pop();
        bonusHand.push(card);
    }

}

function dealNewCards() {
    const remainingHand = hand.filter(card => card !== 'played');
    hand = remainingHand;
    console.log(remainingHand);

    remainingHand.forEach(card => {
        deck.push(card);
    })

    hand = [];
    shuffleDeck();
    dealCards();
    console.log(hand);
}

function startingPos() {
    for (let i = 0; i < 5; i++) {
        const cardSlot = document.getElementById("card" + i);
        cardSlots.push(cardSlot);
        const rect = cardSlot.getBoundingClientRect();
        cardPositions.push({ x: rect.left, y: rect.top });
    }
    console.log(cardPositions);

    const startDeck = document.getElementById("deck").getBoundingClientRect();
    startXDeck = startDeck.left;
    startYDeck = startDeck.top;

    console.log(startXDeck, startYDeck);
}

function replaceCard() {
    e.preventDefault();

    const dropId = e.dataTransfer.getData("text/plain");
    const drop = document.getElementById(dropId);
    const cardSlot = drop;

    if (!cardSlot) return;


    const cardImage = cardSlot.querySelector("img");
    if (cardImage) {

        const cardValue = cardImage.dataset.handValue;

        const cardIndex = hand.indexOf(cardValue);

        if (cardIndex !== -1) {
            hand[cardIndex] = 'discarded';
            console.log("Hand after discard (with dummy):", hand);
        }

        cardSlot.removeChild(cardImage);
    }



    const newCard = deck.pop();
    const newCardImg = document.createElement("img");
    newCardImg.src = `./cards/${newCard}.png`;
    newCardImg.dataset.handValue = newCard;

    cardSlot.appendChild(newCardImg);

    const cardIndex = hand.indexOf('discarded');
    if (cardIndex !== -1) {
        hand[cardIndex] = newCard;
    }

    console.log("Hand after new card dealt:", hand);
}




