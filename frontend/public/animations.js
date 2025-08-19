var id = null;
function dealAnimation(callback, targets = cardPositions.slice(0, 5)) {
    var currentCard = 0;
    var targetX = targets[currentCard].x;
    var targetY = targets[currentCard].y;

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
        var stepSize = 20;
        var deltaX = targetX - posLeft;
        var deltaY = targetY - posTop;

        if (Math.abs(deltaX) <= stepSize && Math.abs(deltaY) <= stepSize) {
            posLeft = targetX;
            posTop = targetY;
        } else {
            posLeft += (Math.abs(deltaX) > stepSize ? (deltaX > 0 ? stepSize : -stepSize) : 0);
            posTop += (Math.abs(deltaY) > stepSize ? (deltaY > 0 ? stepSize : -stepSize) : 0);
        }

        elem.style.top = posTop + 'px';
        elem.style.left = posLeft + 'px';

        if (posLeft === targetX && posTop === targetY) {
            currentCard++;

            if (currentCard < targets.length) {
                targetX = targets[currentCard].x;
                targetY = targets[currentCard].y;

                var newElem = document.createElement('div');
                newElem.id = 'animatedCard' + currentCard;
                document.body.appendChild(newElem);
                newElem.style.position = 'absolute';
                newElem.style.backgroundImage = "url('./cards/BACK.png')";
                newElem.style.backgroundSize = "cover";
                newElem.style.height = '180px';
                newElem.style.width = '125px';
                newElem.style.borderRadius = '5px';

                newElem.style.left = startXDeck + 425 + 'px';
                newElem.style.top = startYDeck + 'px';

                elem = newElem;
                posLeft = startXDeck + 425;
                posTop = startYDeck;
            } else {
                setTimeout(() => {
                    for (let i = 0; i <= currentCard; i++) {
                        var card = document.getElementById('animatedCard' + i);
                        if (card) card.remove();
                    }
                    callback();
                }, 500);
                clearInterval(id);
            }
        }
    }, 10);
}
