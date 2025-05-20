var id = null;

function dealAnimation(callback) {

    var currentCard = 0;
    var targetX = cardPositions[currentCard].x;
    var targetY = cardPositions[currentCard].y;

    // Create and initialize the first card's element
    var elem = document.createElement('div');
    elem.id = 'animatedCard0';
    document.body.appendChild(elem);
    elem.style.position = 'absolute';
    elem.style.backgroundImage = "url('./cards/BACK.png')";
    elem.style.backgroundSize = "cover";
    elem.style.height = '180px';
    elem.style.width = '125px';
    elem.style.borderRadius = '5px';

    var posLeft = startXDeck + 425;
    var posTop = startYDeck;

    elem.style.left = posLeft + 'px';
    elem.style.top = posTop + 'px';

    clearInterval(id);
    id = setInterval(function () {
        // Calculate the step size based on the target's difference
        var stepSize = 20; // Controls the speed of the animation

        // Calculate the difference between the current and target positions
        var deltaX = targetX - posLeft;
        var deltaY = targetY - posTop;

        // Check if the card has reached the target position
        if (Math.abs(deltaX) <= stepSize && Math.abs(deltaY) <= stepSize) {
            posLeft = targetX;
            posTop = targetY;
        } else {
            // Move in the X direction
            if (Math.abs(deltaX) > stepSize) {
                posLeft += (deltaX > 0 ? stepSize : -stepSize); // Move right or left
            } else {
                posLeft = targetX; // Set exactly at target if it's close
            }

            // Move in the Y direction
            if (Math.abs(deltaY) > stepSize) {
                posTop += (deltaY > 0 ? stepSize : -stepSize); // Move down or up
            } else {
                posTop = targetY; // Set exactly at target if it's close
            }
        }

        elem.style.top = posTop + 'px';
        elem.style.left = posLeft + 'px';

        // Check if the card reached its target position
        if (posLeft === targetX && posTop === targetY) {
            // Move to the next card if there is one
            currentCard++;

            // Check if there are more cards to animate
            if (currentCard < cardPositions.length) {
                // Reset the target for the next card
                targetX = cardPositions[currentCard].x;
                targetY = cardPositions[currentCard].y;

                // Create a new card element for the next one
                var newElem = document.createElement('div');
                newElem.id = 'animatedCard' + currentCard;
                document.body.appendChild(newElem);

                // Initialize the new card at the deck position
                newElem.style.position = 'absolute';
                newElem.style.backgroundImage = "url('./cards/BACK.png')";
                newElem.style.backgroundSize = "cover";
                newElem.style.height = '180px';
                newElem.style.width = '125px';
                elem.style.borderRadius = '5px';


                // Set the initial position of the new card to start from the deck
                newElem.style.left = startXDeck + 'px';
                newElem.style.top = startYDeck + 'px';

                // Update element for next card
                elem = newElem;
                posLeft = startXDeck + 425;
                posTop = startYDeck;
            } else {

                setTimeout(function () {
                    for (let i = 0; i <= currentCard; i++) {
                        var card = document.getElementById('animatedCard' + i);
                        if (card) {
                            card.remove();
                        }
                    }
                    callback();
                }, 500);
                clearInterval(id);
            }
        }
    }, 10);

}

