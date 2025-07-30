function evaluateHand(cards) {
    const values = cards.map(card => card.split("-")[0]); 
    const suits = cards.map(card => card.split("-")[1]);  
    const handSize = cards.length;

    values.forEach(value => {
        if (value === "A") {
            points += 15 * handSize; 
        } else if (["J", "Q", "K", "10"].includes(value)) {
            points += 10 * handSize; 
        } else {
            points += 5 * handSize; 
        }
    });


    
    const valueCounts = values.reduce((acc, value) => {
        acc[value] = (acc[value] || 0) + 1;
        return acc;
    }, {});

    const pairs = Object.values(valueCounts).filter(count => count === 2);
    const isTwoPair = pairs.length === 2;  
    const isPair = Object.values(valueCounts).includes(2);
    const isThreeOfAKind = Object.values(valueCounts).includes(3);
    const isFourOfAKind = Object.values(valueCounts).includes(4);
    const isFullHouse = Object.values(valueCounts).includes(3) && Object.values(valueCounts).includes(2);
    const isFlush = suits.length === 5 && suits.every(suit => suit === suits[0]);

    const royalFlushCards = ["A", "K", "Q", "J", "10"];
    if (royalFlushCards.every(val => values.includes(val)) && suits.every(suit => suit === suits[0])) {
        points += 1000;  
        return { handType: "Royal Flush", totalScore }; 
    }

   
    const valueOrder = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const sortedValues = values.map(value => valueOrder.indexOf(value)).sort((a, b) => a - b);
    const isStraight = sortedValues[4] - sortedValues[0] === 4 && new Set(sortedValues).size === 5;

    if (isStraight && isFlush) {
        return "Straight Flush";
    } else if (isFourOfAKind) {
        return "Four of a Kind";
    } else if (isFullHouse) {
        return "Full House";
    } else if (isFlush) {
        return "Flush";
    } else if (isStraight) {
        return "Straight";
    } else if (isThreeOfAKind) {
        return "Three of a Kind";
    } else if(isTwoPair){
        return "Two Pairs";
    } else if (isPair) {
        return "Pair";
    } else {
        
    }
}


