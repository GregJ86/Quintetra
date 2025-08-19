var deck = [];
var hand = [];
var playedCard = [];
var bonusDeck = [];
var bonusHand = [];
var currentPoints = 0;
var points = 0;
var wagerReady = false;

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
const newGameWindow = document.querySelector('.newGameWindow');
const newGameButton = document.getElementById('newgame');
const newGameYesButton = document.getElementById('ngStartButton');
const newGameCancelButton = document.getElementById('ngCancelButton');
const quitWindow = document.querySelector('.quitGameWindow');
const quitGameCancelButton = document.getElementById('quitCancelButton');

var startXDeck = 0;
var startYDeck = 0;

const cardSlots = [];
const cardPositions = [];

window.gameState = window.gameState || {};
window.gameState.getPoints = () => points;

window.onload = function () {
    buildDeck();
    shuffleDeck();
    startingPos();
    initializeDragDropEvents();
    updateButtonStates();
    console.log(deck);
    dealAnimation(dealNewCards);
}



window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
});



///////////////////////////////////////////////////////////
function initializeDragDropEvents() {
    cards.forEach((card, index) => {
        card.addEventListener('dragstart', (e) => {
            const img = card.querySelector('img');
            if(!img){
                e.preventDefault();
                return;
            }
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
            if (!dropZone.querySelector('img')) {

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

            updateButtonStates();
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

    if (deck.length === 0) return;

    const dropId = e.dataTransfer.getData("text/plain");
    const drop = document.getElementById(dropId);
    const cardSlot = drop;
    if (!cardSlot) return;

    const cardImage = cardSlot.querySelector("img");
    let cardIndex = -1;

    if (cardImage) {
        const cardValue = cardImage.dataset.handValue;
        cardIndex = hand.indexOf(cardValue);

        if (cardIndex !== -1) {
            hand[cardIndex] = 'discarded';
            console.log("Hand after discard (with dummy):", hand);
        }

        cardSlot.removeChild(cardImage);
    }

    if (cardIndex === -1) return;

    const targetRect = cardSlot.getBoundingClientRect();
    const targetPosition = { x: targetRect.left, y: targetRect.top };

    dealAnimation(() => {
        const newCard = deck.pop();
        const newCardImg = document.createElement("img");
        newCardImg.src = `./cards/${newCard}.png`;
        newCardImg.dataset.handValue = newCard;

        cardSlot.appendChild(newCardImg);
        hand[cardIndex] = newCard;

        cardsLeft.textContent = "Deck: " + deck.length;
        console.log("Hand after new card dealt:", hand);
    }, [targetPosition]);
});

////////////////////////////////////////////////////////////////
scoreButton.addEventListener("click", () => {

    currentPoints = points;
    const handResult = evaluateHand(playedCard);


    if(playedCard.length >= 2 && handResult != null){
    bonus.style.display = 'grid';
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
    }else{
        resetCards();
        clearDrops();
        points = currentPoints;
    }

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

wagerInput.addEventListener('input', updateButtonStates);

wagerButton.addEventListener("click", () => {

    const wagerAmount = parseInt(wagerInput.value, 10);

    if (isNaN(wagerAmount) || wagerAmount <= 0 || wagerAmount > points) {
                   
                    wagerReady = false;
                    return;
        }
    wagerButton.disabled = true;
    wagerReady = true;

    console.log(wagerAmount);
    console.log(points);


    bonusZones.forEach(bonusZone => {
        bonusZone.addEventListener('click', () => {

            if (!wagerReady) return;
            
            

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

                    const currentWagerAmount = parseInt(wagerInput.value, 10);
                    console.log(currentWagerAmount);

                    
                    switch (bonus) {
                        case "Z-1":
                            points = points + (10 * currentWagerAmount);
                            break;
                        case "Z-2":
                            points = points + (5 * currentWagerAmount);
                            break;
                        case "Z-3":
                            points = points + (2 * currentWagerAmount);
                            break;
                        case "Z-4":
                            points = points;
                            break;
                        case "Z-5":
                            points = points - currentWagerAmount;
                            break;
                    }

                    console.log(points);

                    wagerReady = false;

                }

            }

        })
        
    })

});

newGameButton.addEventListener("click", () => {
    newGameWindow.style.display = 'grid';
});

newGameYesButton.addEventListener("click", () => {
    deck = [];
    hand = [];
    playedCard = [];
    points = 0;

    buildDeck();
    shuffleDeck();

    clearDrops();
    clearHand();
    dealAnimation(dealCards);

    totalScore.textContent = "Gold: "
    cardsLeft.textContent = "Deck: " + deck.length;
    updateButtonStates();
    newGameWindow.style.display = 'none';
});

newGameCancelButton.addEventListener("click", ()=> {
    newGameWindow.style.display = 'none';

});

endGameButton.addEventListener("click", () => {
    quitWindow.style.display = 'grid';
});

quitGameCancelButton.addEventListener("click", () => {
    quitWindow.style.display = 'none';
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
    });
    updateButtonStates();
}
function clearHand() {
    cards.forEach(card => {
        card.innerHTML = '';
    });
    updateButtonStates();
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

function updateButtonStates() {
    
    const hasCardInDropZone = Array.from(dropZones).some(dropZone => dropZone.querySelector('img'));
    const wagerAmount = parseInt(wagerInput.value, 10);
    const isValidWager = !isNaN(wagerAmount) && wagerAmount > 0 && wagerAmount <= points;



    scoreButton.disabled = !hasCardInDropZone;
    resetButton.disabled = !hasCardInDropZone;
    wagerButton.disabled = !isValidWager;
}




