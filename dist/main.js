/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom_managament.js":
/*!*******************************!*\
  !*** ./src/dom_managament.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addShipClass: () => (/* binding */ addShipClass),\n/* harmony export */   disableBoard: () => (/* binding */ disableBoard),\n/* harmony export */   printWinner: () => (/* binding */ printWinner)\n/* harmony export */ });\nfunction addShipClass(x, y, playerName, className){\r\n    const cell = document.getElementById(`${playerName}-${x}${y}`);\r\n    cell.classList.add(className);\r\n}\r\n\r\nfunction printWinner(playerName){\r\n    const resultsDiv = document.getElementById('results');\r\n    const winnerDiv = document.createElement('div');\r\n    winnerDiv.setAttribute('id', 'winnerDiv');\r\n\r\n    const winnerText = document.createElement('div');\r\n    winnerText.setAttribute('id', 'winnerText');\r\n    winnerText.innerHTML = playerName + \" won!\";\r\n\r\n    const resetButton = document.createElement('button');\r\n    resetButton.setAttribute('id', 'resetButton');\r\n    resetButton.innerHTML = \"Reset\";\r\n    resetButton.addEventListener('click', () => {\r\n        location.reload();\r\n    });\r\n    winnerDiv.appendChild(winnerText);\r\n    winnerDiv.appendChild(resetButton);\r\n    resultsDiv.appendChild(winnerDiv);\r\n}\r\n\r\nfunction disableBoard(playerName){\r\n    const board = document.getElementById(`${playerName}_board`);\r\n    board.classList.add('disabled');\r\n}\r\n\r\n\n\n//# sourceURL=webpack://battleship/./src/dom_managament.js?");

/***/ }),

/***/ "./src/gamefunctions.js":
/*!******************************!*\
  !*** ./src/gamefunctions.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Gameboard: () => (/* binding */ Gameboard),\n/* harmony export */   Player: () => (/* binding */ Player),\n/* harmony export */   createBoards: () => (/* binding */ createBoards)\n/* harmony export */ });\n/* harmony import */ var _dom_managament__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom_managament */ \"./src/dom_managament.js\");\n\r\n\r\nfunction Ship (id, x, y, hitCount, isSunk) {\r\n    const hit = () => {\r\n        hitCount += 1;\r\n        if (hitCount === 1) {\r\n            isSunk = true;\r\n        }\r\n    };\r\n\r\n    const getHitCount = () => hitCount;\r\n    const getIsSunk = () => isSunk;\r\n\r\n    return { id, x, y, hit, getHitCount, getIsSunk };\r\n};\r\n\r\nconst Player = (playerName) => {\r\n    const attack = (enemyGameboard, x, y) => {\r\n        console.log(\"Player \" + playerName + \" attacks \" + enemyGameboard.name() + \" at \" + x + \", \" + y);\r\n        let won = enemyGameboard.receiveAttack(x, y);\r\n        if(won){\r\n            (0,_dom_managament__WEBPACK_IMPORTED_MODULE_0__.printWinner)(playerName);\r\n        }\r\n    }\r\n\r\n    const name = () => playerName;\r\n\r\n    return { attack, name};\r\n};\r\n\r\nfunction createBoards(player1Board, player2Board, player1, player2){\r\n    const playerBoard = document.getElementById('player_board');\r\n    const computerBoard = document.getElementById('computer_board');\r\n\r\n    for(let i=1; i<7; i++){\r\n        const playerRow = document.createElement('tr');\r\n        const computerRow = document.createElement('tr');\r\n\r\n        for(let j=1; j<7; j++){\r\n            const playerCell = document.createElement('td');\r\n            const computerCell = document.createElement('td');\r\n            playerCell.setAttribute('id', `player-${i}${j}`);\r\n            computerCell.setAttribute('id', `computer-${i}${j}`);\r\n\r\n            playerCell.addEventListener('click', () => {\r\n                player2.attack(player1Board, i, j);\r\n            });\r\n\r\n            computerCell.addEventListener('click', () => {\r\n                player1.attack(player2Board, i, j);\r\n                //console.log(Math.ceil(Math.random() * 10) + \" : \" + Math.floor(Math.random() * 10))\r\n                player2.attack(player1Board, Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6));\r\n            });\r\n\r\n            playerRow.appendChild(playerCell);\r\n            computerRow.appendChild(computerCell);\r\n        }\r\n        playerBoard.appendChild(playerRow);\r\n        computerBoard.appendChild(computerRow);\r\n    }\r\n}\r\n\r\nfunction Gameboard(playerName) {\r\n    let missedShots = [];\r\n    let ships = [];\r\n\r\n    const receiveAttack = (x, y) => {\r\n\r\n        let shipWasHit = false;\r\n        ships.forEach(ship => {\r\n            if (ship.x === x && ship.y === y) {\r\n                ship.hit();\r\n                console.log(ship.id + \": \" + ship.getHitCount());\r\n                (0,_dom_managament__WEBPACK_IMPORTED_MODULE_0__.addShipClass)(x, y, playerName, \"ship\");\r\n                shipWasHit = true;\r\n                console.log(\"receive atk, ships foreach\");\r\n            } else {\r\n                (0,_dom_managament__WEBPACK_IMPORTED_MODULE_0__.addShipClass)(x, y, playerName, \"notShip\");\r\n            }\r\n        });\r\n\r\n        if (!shipWasHit) {\r\n            missedShots.push({ x, y });\r\n        }else{\r\n            return allShipsSunk();\r\n        };\r\n    }\r\n\r\n    const allShipsSunk = () => {\r\n        return ships.every(ship => ship.getIsSunk());\r\n    }\r\n\r\n    const placeAllShips = (ids) => {\r\n        ids.forEach(id => {\r\n            ships.push(Ship(id, Math.trunc(id/10), id%10, 0, false));\r\n        });\r\n    }\r\n\r\n    const name = () => playerName;\r\n\r\n    return { missedShots, ships, receiveAttack, allShipsSunk, placeAllShips, name };\r\n};\r\n\r\n\n\n//# sourceURL=webpack://battleship/./src/gamefunctions.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dom_managament_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom_managament.js */ \"./src/dom_managament.js\");\n/* harmony import */ var _gamefunctions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gamefunctions.js */ \"./src/gamefunctions.js\");\n\r\n\r\n\r\nlet player1Name = \"player\";\r\nlet player2Name = \"computer\";\r\n\r\ngameLoop();\r\n\r\nfunction gameLoop(){\r\n    const player = (0,_gamefunctions_js__WEBPACK_IMPORTED_MODULE_1__.Player)(player1Name, true);\r\n    const computer = (0,_gamefunctions_js__WEBPACK_IMPORTED_MODULE_1__.Player)(player2Name, false);\r\n\r\n    const playerBoard = (0,_gamefunctions_js__WEBPACK_IMPORTED_MODULE_1__.Gameboard)(player1Name);\r\n    const computerBoard = (0,_gamefunctions_js__WEBPACK_IMPORTED_MODULE_1__.Gameboard)(player2Name);\r\n\r\n    (0,_gamefunctions_js__WEBPACK_IMPORTED_MODULE_1__.createBoards)(playerBoard, computerBoard, player, computer);\r\n\r\n    playerBoard.placeAllShips([11, 12, 13, 14]);\r\n    computerBoard.placeAllShips([21, 22, 23, 24]);\r\n    //disableBoard(player1Name);\r\n}\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;