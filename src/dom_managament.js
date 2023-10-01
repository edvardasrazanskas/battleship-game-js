function addShipClass(x, y, playerName, className){
    const cell = document.getElementById(`${playerName}-${x}${y}`);
    cell.classList.add(className);
}

function printWinner(playerName){
    const resultsDiv = document.getElementById('results');
    const winnerDiv = document.createElement('div');
    winnerDiv.setAttribute('id', 'winnerDiv');

    const winnerText = document.createElement('div');
    winnerText.setAttribute('id', 'winnerText');
    winnerText.innerHTML = playerName + " won!";

    const resetButton = document.createElement('button');
    resetButton.setAttribute('id', 'resetButton');
    resetButton.innerHTML = "Reset";
    resetButton.addEventListener('click', () => {
        location.reload();
    });
    winnerDiv.appendChild(winnerText);
    winnerDiv.appendChild(resetButton);
    resultsDiv.appendChild(winnerDiv);
}

function disableBoard(playerName){
    const board = document.getElementById(`${playerName}_board`);
    board.classList.add('disabled');
}

export { addShipClass, printWinner, disableBoard };