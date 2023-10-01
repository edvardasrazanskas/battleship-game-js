import { disableBoard } from "./dom_managament.js";
import { Player, Gameboard, createBoards } from "./gamefunctions.js";

let player1Name = "player";
let player2Name = "computer";

gameLoop();

function gameLoop(){
    const player = Player(player1Name, true);
    const computer = Player(player2Name, false);

    const playerBoard = Gameboard(player1Name);
    const computerBoard = Gameboard(player2Name);

    createBoards(playerBoard, computerBoard, player, computer);

    playerBoard.placeAllShips([11, 12, 13, 14]);
    computerBoard.placeAllShips([21, 22, 23, 24]);
    //disableBoard(player1Name);
}