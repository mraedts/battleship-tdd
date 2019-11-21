/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const renderGridDivs = boards => {\n  const gameBoardGrids = document.querySelectorAll('.gameboard-grid');\n\n  const renderPlayerBoard = () => {\n    const playerBoardGrid = gameBoardGrids[0],\n      playerBoard = boards[0];\n\n    const getHitArray = () => {\n      let hitPositions = [];\n      playerBoard.ships.forEach(ship => {\n        ship.positions.forEach(positionItem => {\n          if (positionItem.isHit) {\n            hitPositions.push(positionItem.position);\n          }\n        });\n      });\n      return hitPositions;\n    };\n\n    const getShipArray = () => {\n      let shipPositions = [];\n      playerBoard.ships.forEach(ship => {\n        ship.positions.forEach(positionItem => {\n          shipPositions.push(positionItem.position);\n        });\n      });\n      return shipPositions;\n    };\n\n    for (let i = 1; i <= 100; i++) {\n      const hitPositions = getHitArray();\n      const shipPositions = getShipArray();\n\n      const div = document.createElement('div');\n      div.dataset.pos = i;\n      div.classList.add('grid-div');\n\n      if (shipPositions.includes(i)) {\n        div.style.backgroundColor = 'lightGrey';\n      }\n\n      if (playerBoard.missedAttackPositions.includes(i)) {\n        div.textContent = 'miss';\n      } else if (hitPositions.includes(i)) {\n        div.textContent = 'hit';\n      }\n\n      playerBoardGrid.appendChild(div);\n    }\n  };\n\n  renderPlayerBoard();\n};\n\nconst markAsMissed = (boardGrid, pos) => {\n  console.log(document.querySelector('#master-container'));\n};\n\nmodule.exports = { renderGridDivs, markAsMissed };\n\n\n//# sourceURL=webpack:///./src/dom.js?");

/***/ }),

/***/ "./src/gameobjects.js":
/*!****************************!*\
  !*** ./src/gameobjects.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Player = playerType => {\n  let previousAttackPositions = [];\n\n  const attack = (board, pos) => {\n    if (previousAttackPositions.includes(pos)) {\n      return;\n    }\n    board.receiveAttack(pos);\n    previousAttackPositions.push(pos);\n  };\n\n  const aiAttack = board => {\n    if (playerType == 'human') {\n      return;\n    }\n    let positionToBeAttacked = Math.floor(Math.random() * 100 + 1);\n    if (previousAttackPositions.includes(positionToBeAttacked)) {\n      aiAttack(board);\n    } else {\n      board.receiveAttack(positionToBeAttacked);\n      previousAttackPositions.push(positionToBeAttacked);\n    }\n  };\n\n  return { attack, previousAttackPositions, aiAttack };\n};\n\nconst GameBoard = playerNumber => {\n  this.playerNumber = playerNumber;\n  let ships = [];\n  let missedAttackPositions = [];\n  let allShipsSunk = false;\n  let shipLengths = [2, 2, 2, 2, 3, 3, 3, 4, 4, 5];\n\n  const placeShipsDefault = () => {\n    const placePlayerShips = () => {};\n\n    const placeAIShips = () => {\n      // create a ship with random positions with given length, runs recursively until legal ship is placed\n      const createShip = shipLength => {\n        let startingNumber = Math.floor(Math.random() * 100 + 1);\n        let myPositions = [startingNumber];\n        // < 0.5 = one number difference between positions (horizontal)\n        // > 0.5 = ten number difference (vertical)\n        let oneOrTen = Math.random();\n\n        if (oneOrTen < 0.5) {\n          for (let i = 0; i < shipLength - 1; i++) {\n            myPositions.push(myPositions[myPositions.length - 1] + 1);\n          }\n        } else {\n          for (let i = 0; i < shipLength - 1; i++) {\n            myPositions.push(myPositions[myPositions.length - 1] + 10);\n          }\n        }\n\n        // if ship is illegal, try new one\n        if (!addShip(myPositions)) {\n          createShip(shipLength);\n        }\n      };\n      shipLengths.forEach(length => {\n        createShip(length);\n      });\n    };\n\n    placeAIShips();\n  };\n\n  const checkIfAllShipsSunk = () => {\n    let shipPositions = 0,\n      hitPositions = 0;\n\n    ships.forEach(ship => {\n      ship.positions.forEach(positionItem => {\n        shipPositions++;\n        if (positionItem.isHit == true) {\n          hitPositions++;\n        }\n      });\n    });\n    if (shipPositions == hitPositions) {\n      return true;\n    } else {\n      return false;\n    }\n  };\n\n  const addShip = posArray => {\n    const newShipConflicts = () => {\n      let previousShipPositions = [];\n      ships.forEach(ship => {\n        ship.positions.forEach(positionItem => {\n          previousShipPositions.push(positionItem.position);\n        });\n      });\n\n      for (let i = 0; i < posArray.length; i++) {\n        if (previousShipPositions.includes(posArray[i])) {\n          return true;\n        }\n      }\n      return false;\n    };\n\n    const newShipWraps = () => {\n      for (let i = 10; i <= 90; i) {\n        if (posArray.includes(i) && posArray.includes(i + 1)) {\n          return true;\n        }\n        i += 10;\n      }\n      return false;\n    };\n\n    const shipHasUnadjacentPositions = () => {\n      const differenceBetweenPos = posArray[1] - posArray[0];\n      let tenArray = [posArray[0]];\n      let oneArray = [posArray[0]];\n\n      for (let i = 1; i <= posArray.length - 1; i++) {\n        tenArray.push(tenArray[tenArray.length - 1] + 10);\n      }\n      for (let i = 1; i <= posArray.length - 1; i++) {\n        oneArray.push(oneArray[oneArray.length - 1] + 1);\n      }\n\n      let matchesTen = true;\n      let matchesOne = true;\n\n      for (let i = 0; i < posArray.length; i++) {\n        if (posArray[i] != tenArray[i]) {\n          matchesTen = false;\n        }\n      }\n      for (let i = 0; i < posArray.length; i++) {\n        if (posArray[i] != oneArray[i]) {\n          matchesOne = false;\n        }\n      }\n\n      if (matchesTen || matchesOne) {\n        return false;\n      } else {\n        return true;\n      }\n    };\n\n    const shipIsOutOfBounds = () => {\n      const invalidPositions = [\n        0,\n        101,\n        102,\n        103,\n        104,\n        105,\n        106,\n        107,\n        108,\n        109,\n        110\n      ];\n      for (let i = 0; i < posArray.length; i++) {\n        if (invalidPositions.includes(posArray[i])) {\n          return true;\n        }\n      }\n    };\n\n    if (\n      newShipConflicts() ||\n      newShipWraps() ||\n      shipHasUnadjacentPositions() ||\n      shipIsOutOfBounds()\n    ) {\n      return false;\n    }\n\n    const newShip = Ship();\n    newShip.setPositions(posArray);\n    ships.push(newShip);\n    return true;\n  };\n\n  const receiveAttack = pos => {\n    let attackMissed = true;\n    ships.forEach(ship => {\n      ship.positions.forEach(positionItem => {\n        if (positionItem.position == pos) {\n          ship.hit(pos);\n          attackMissed = false;\n        }\n      });\n    });\n    if (attackMissed) {\n      missedAttackPositions.push(pos);\n    }\n  };\n  const getPlayerNumber = () => playerNumber;\n\n  return {\n    getPlayerNumber,\n    addShip,\n    ships,\n    receiveAttack,\n    missedAttackPositions,\n    checkIfAllShipsSunk,\n    placeShipsDefault\n  };\n};\n\nconst Ship = () => {\n  let positions = [];\n\n  const setPositions = positionsArray => {\n    positionsArray.forEach(pos => {\n      positions.push({\n        position: pos,\n        isHit: false\n      });\n    });\n  };\n\n  const hit = targetPosition => {\n    positions.forEach(pos => {\n      if (targetPosition == pos.position) {\n        pos.isHit = true;\n      }\n    });\n  };\n\n  const isSunk = () => {\n    let hitPositions = 0;\n    for (let i = 0; i < positions.length; i++) {\n      if (positions[i].isHit == true) {\n        hitPositions++;\n      }\n    }\n\n    if (hitPositions < positions.length) {\n      return false;\n    } else {\n      return true;\n    }\n  };\n\n  return { isSunk, hit, setPositions, positions };\n};\n\nmodule.exports = {\n  Ship,\n  GameBoard,\n  Player\n};\n\n\n//# sourceURL=webpack:///./src/gameobjects.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const main = __webpack_require__(/*! ./gameobjects */ \"./src/gameobjects.js\");\nconst dom = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\nconst Ship = main.Ship,\n  GameBoard = main.GameBoard,\n  Player = main.Player;\n\nconst gameFlow = (() => {\n  let playerTurn = 1;\n  let boards = [GameBoard(1), GameBoard(2)];\n  let players = [Player('human'), Player('ai')];\n\n  // boards[0].addShip([25, 35, 35, 45, 55]);\n\n  // boards[0].addShip([81, 82, 83, 84, 85]);\n\n  // boards[0].receiveAttack(1);\n  // boards[0].receiveAttack(6);\n\n  // boards[0].receiveAttack(25);\n  // boards[0].receiveAttack(35);\n  // boards[0].receiveAttack(45);\n  // boards[0].receiveAttack(55);\n\n  // boards[0].receiveAttack(84);\n\n  boards[0].placeShipsDefault();\n\n  const resetGame = () => {\n    boards = [GameBoard(1), GameBoard(2)];\n    players = [Player('human'), Player('ai')];\n  };\n\n  dom.renderGridDivs(boards);\n\n  boards[0].ships.forEach(ship => {\n    console.log(ship.positions);\n  });\n})();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });