import { addShipClass, printWinner, disableBoard } from "./dom_managament";

function Ship (id, x, y, hitCount, isSunk) {
    const hit = () => {
        hitCount += 1;
        if (hitCount === 1) {
            isSunk = true;
        }
    };

    const getHitCount = () => hitCount;
    const getIsSunk = () => isSunk;

    return { id, x, y, hit, getHitCount, getIsSunk };
};

const Player = (playerName) => {
    const attack = (enemyGameboard, x, y) => {
        console.log("Player " + playerName + " attacks " + enemyGameboard.name() + " at " + x + ", " + y);
        let won = enemyGameboard.receiveAttack(x, y);
        if(won){
            printWinner(playerName);
        }
    }

    const name = () => playerName;

    return { attack, name};
};

function createBoards(player1Board, player2Board, player1, player2){
    const playerBoard = document.getElementById('player_board');
    const computerBoard = document.getElementById('computer_board');

    for(let i=1; i<7; i++){
        const playerRow = document.createElement('tr');
        const computerRow = document.createElement('tr');

        for(let j=1; j<7; j++){
            const playerCell = document.createElement('td');
            const computerCell = document.createElement('td');
            playerCell.setAttribute('id', `player-${i}${j}`);
            computerCell.setAttribute('id', `computer-${i}${j}`);

            playerCell.addEventListener('click', () => {
                player2.attack(player1Board, i, j);
            });

            computerCell.addEventListener('click', () => {
                player1.attack(player2Board, i, j);
                //console.log(Math.ceil(Math.random() * 10) + " : " + Math.floor(Math.random() * 10))
                player2.attack(player1Board, Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6));
            });

            playerRow.appendChild(playerCell);
            computerRow.appendChild(computerCell);
        }
        playerBoard.appendChild(playerRow);
        computerBoard.appendChild(computerRow);
    }
}

function Gameboard(playerName) {
    let missedShots = [];
    let ships = [];

    const receiveAttack = (x, y) => {

        let shipWasHit = false;
        ships.forEach(ship => {
            if (ship.x === x && ship.y === y) {
                ship.hit();
                console.log(ship.id + ": " + ship.getHitCount());
                addShipClass(x, y, playerName, "ship");
                shipWasHit = true;
                console.log("receive atk, ships foreach");
            } else {
                addShipClass(x, y, playerName, "notShip");
            }
        });

        if (!shipWasHit) {
            missedShots.push({ x, y });
        }else{
            return allShipsSunk();
        };
    }

    const allShipsSunk = () => {
        return ships.every(ship => ship.getIsSunk());
    }

    const placeAllShips = (ids) => {
        ids.forEach(id => {
            ships.push(Ship(id, Math.trunc(id/10), id%10, 0, false));
        });
    }

    const name = () => playerName;

    return { missedShots, ships, receiveAttack, allShipsSunk, placeAllShips, name };
};

export {Gameboard, Player, createBoards}