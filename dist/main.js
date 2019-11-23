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

eval("const renderGridDivs = (boards, clickPosHandler, players, gameState) => {\n  const gameBoardGrids = document.querySelectorAll('.gameboard-grid'),\n    colors = [\n      '#badaf7',\n      '#091476',\n      '#5ea9ed',\n      '#3090e8',\n      '#1776cf',\n      '#125ca1',\n      '#0d4273',\n      '#082745',\n      '#1f6b93',\n      '#1025d5'\n    ];\n\n  gameBoardGrids.forEach(grid => {\n    grid.innerHTML = '';\n  });\n\n  const getColor = (shipPositions, i) => {\n    if (shipPositions.includes(i)) {\n      if (shipPositions.indexOf(i) < 2) {\n        return colors[0];\n      } else if (shipPositions.indexOf(i) < 4) {\n        return colors[1];\n      } else if (shipPositions.indexOf(i) < 6) {\n        return colors[2];\n      } else if (shipPositions.indexOf(i) < 8) {\n        return colors[3];\n      } else if (shipPositions.indexOf(i) < 11) {\n        return colors[4];\n      } else if (shipPositions.indexOf(i) < 14) {\n        return colors[5];\n      } else if (shipPositions.indexOf(i) < 17) {\n        return colors[6];\n      } else if (shipPositions.indexOf(i) < 21) {\n        return colors[7];\n      } else if (shipPositions.indexOf(i) < 25) {\n        return colors[8];\n      } else if (shipPositions.indexOf(i) < 30) {\n        return colors[9];\n      }\n    }\n  };\n  const renderPlayerBoard = () => {\n    const playerBoardGrid = gameBoardGrids[0],\n      playerBoard = boards[0];\n\n    playerBoardGrid.innerHTML = '';\n\n    const getHitArray = () => {\n      let hitPositions = [];\n      playerBoard.ships.forEach(ship => {\n        ship.positions.forEach(positionItem => {\n          if (positionItem.isHit) {\n            hitPositions.push(positionItem.position);\n          }\n        });\n      });\n      return hitPositions;\n    };\n\n    const getShipArray = () => {\n      let shipPositions = [];\n      playerBoard.ships.forEach(ship => {\n        ship.positions.forEach(positionItem => {\n          shipPositions.push(positionItem.position);\n        });\n      });\n      return shipPositions;\n    };\n\n    for (let i = 1; i <= 100; i++) {\n      const hitPositions = getHitArray();\n      const shipPositions = getShipArray();\n\n      const div = document.createElement('div');\n      div.dataset.pos = i;\n      div.classList.add('grid-div');\n\n      div.style.backgroundColor = getColor(shipPositions, i);\n\n      if (shipPositions.includes(i)) {\n        div.setAttribute('draggable', true);\n      }\n\n      if (playerBoard.missedAttackPositions.includes(i)) {\n        div.textContent = '';\n        const img = document.createElement('img');\n        img.src = './img/miss.png';\n        img.style.height = '35px';\n        img.style.width = '35px';\n        img.style.paddingTop = '7px';\n        div.appendChild(img);\n      } else if (hitPositions.includes(i)) {\n        div.textContent = '';\n        const img = document.createElement('img');\n        img.src = './img/explosion.png';\n        img.style.height = '45px';\n        img.style.width = '45px';\n        img.style.paddingTop = '1px';\n        div.appendChild(img);\n      }\n\n      const addDropHandler = () => {\n        div.addEventListener('dragover', event => {\n          event.preventDefault();\n        });\n\n        const createShipArray = (isVertical, pos) => {\n          //create ship based on orientation, dropped position and drag starting point\n          const shipLength = boards[0].shipLengths[boards[0].shipNumToPlace];\n          const lastPieceIndex = players[0].lastPieceIndex;\n          let difference = lastPieceIndex - 1;\n          let shipArray = [];\n          let multiplier = 1;\n          if (isVertical) {\n            multiplier = 10;\n          }\n\n          for (let i = 1; i <= shipLength; i++) {\n            if (i < lastPieceIndex) {\n              shipArray.push(pos - difference * multiplier);\n              difference--;\n            } else if (i == lastPieceIndex) {\n              shipArray.push(pos);\n              difference = 1;\n            } else {\n              shipArray.push(pos + difference * multiplier);\n              difference++;\n            }\n          }\n\n          console.log(shipArray);\n          return shipArray;\n        };\n\n        div.addEventListener('drop', event => {\n          event.preventDefault();\n          const pos = Number(event.target.dataset.pos);\n          const isVertical = JSON.parse(event.dataTransfer.getData('text'));\n          const friendlyShipsSunk = document.querySelector(\n            '#friendly-ships-sunk'\n          );\n          const enemyShipsSunk = document.querySelector('#enemy-ships-sunk');\n          const ship = createShipArray(isVertical, pos);\n          if (boards[0].addShip(ship) != false) {\n            if (boards[0].shipNumToPlace == 9) {\n              const piecesContainer = document.querySelector(\n                '#pieces-container'\n              );\n              gameHasStarted = 9;\n              piecesContainer.style.display = 'none';\n              friendlyShipsSunk.style.display = 'block';\n              enemyShipsSunk.style.visibility = 'visible';\n            }\n\n            boards[0].shipNumToPlace++;\n            renderPiecesToPlace(players, boards);\n          }\n\n          renderPlayerBoard();\n        });\n        playerBoardGrid.appendChild(div);\n      };\n\n      addDropHandler();\n      playerBoardGrid.appendChild(div);\n    }\n  };\n\n  const renderAIBoard = () => {\n    const playerBoardGrid = gameBoardGrids[1],\n      playerBoard = boards[1];\n\n    playerBoardGrid.innerHTML = '';\n    const getHitArray = () => {\n      let hitPositions = [];\n      playerBoard.ships.forEach(ship => {\n        ship.positions.forEach(positionItem => {\n          if (positionItem.isHit) {\n            hitPositions.push(positionItem.position);\n          }\n        });\n      });\n      return hitPositions;\n    };\n\n    const getShipArray = () => {\n      let shipPositions = [];\n      playerBoard.ships.forEach(ship => {\n        ship.positions.forEach(positionItem => {\n          shipPositions.push(positionItem.position);\n        });\n      });\n      return shipPositions;\n    };\n\n    for (let i = 1; i <= 100; i++) {\n      const hitPositions = getHitArray();\n      const shipPositions = getShipArray();\n\n      const div = document.createElement('div');\n      div.dataset.pos = i;\n      div.classList.add('grid-div');\n\n      div.style.backgroundColor = getColor(shipPositions, i);\n\n      if (playerBoard.missedAttackPositions.includes(i)) {\n        div.textContent = '';\n        const img = document.createElement('img');\n        img.src = './img/miss.png';\n        img.style.height = '35px';\n        img.style.width = '35px';\n        img.style.paddingTop = '7px';\n        div.appendChild(img);\n      } else if (hitPositions.includes(i)) {\n        div.textContent = '';\n        const img = document.createElement('img');\n        img.src = './img/explosion.png';\n        img.style.height = '45px';\n        img.style.width = '45px';\n        img.style.paddingTop = '1px';\n        div.appendChild(img);\n      } else {\n        div.addEventListener('click', () => {\n          clickPosHandler(i);\n        });\n      }\n\n      playerBoardGrid.appendChild(div);\n    }\n  };\n\n  const setSunkenShipCounts = () => {\n    const friendlySunkenShipsDisplay = document.querySelector(\n      '#friendly-ships-sunk'\n    );\n    const enemySunkenShipsDisplay = document.querySelector('#enemy-ships-sunk');\n\n    friendlySunkenShipsDisplay.textContent = `Friendly ships sunk: ${boards[0].getSunkenShipNumber()}`;\n    enemySunkenShipsDisplay.textContent = `Enemy ships sunk: ${boards[1].getSunkenShipNumber()}`;\n  };\n\n  setSunkenShipCounts();\n  renderPlayerBoard();\n  renderAIBoard();\n  renderPiecesToPlace(players, boards);\n};\n\nconst Piece = (shipLength, players) => {\n  const piece = document.createElement('div');\n  piece.id = 'piece-grid';\n  piece.style.position = 'absolute';\n  piece.setAttribute('draggable', true);\n  piece.style.width = `${45 * shipLength}px`;\n  piece.style.gridTemplateColumns = `repeat(${shipLength}, 1fr)`;\n\n  for (let i = 0; i < shipLength; i++) {\n    const block = document.createElement('div');\n    block.dataset.index = i + 1;\n    block.id = 'regular-block';\n    block.classList.add('block');\n    block.addEventListener('mouseover', event => {\n      console.log(event.target.dataset.index);\n      players[0].lastPieceIndex = event.target.dataset.index;\n      console.log(`index: ${players[0].lastPieceIndex}`);\n    });\n    piece.appendChild(block);\n  }\n\n  return piece;\n};\n\nconst renderPiecesToPlace = (players, boards) => {\n  const shipLength = boards[0].shipLengths[boards[0].shipNumToPlace];\n\n  const piecesContainer = document.querySelector('#pieces-container');\n  piecesContainer.innerHTML = '';\n\n  const Piece = (shipLength, players, numToPlace) => {\n    const colors = [\n      '#badaf7',\n      '#091476',\n      '#5ea9ed',\n      '#3090e8',\n      '#1776cf',\n      '#125ca1',\n      '#0d4273',\n      '#082745',\n      '#1f6b93',\n      '#1025d5'\n    ];\n\n    const piece = document.createElement('div');\n    piece.id = 'piece-grid';\n    piece.style.position = 'absolute';\n    piece.setAttribute('draggable', true);\n    piece.style.width = `${45 * shipLength}px`;\n    piece.style.gridTemplateColumns = `repeat(${shipLength}, 1fr)`;\n\n    for (let i = 0; i < shipLength; i++) {\n      const block = document.createElement('div');\n      block.dataset.index = i + 1;\n      block.id = 'regular-block';\n      block.classList.add('block');\n      block.style.backgroundColor = colors[numToPlace];\n      block.addEventListener('mouseover', event => {\n        console.log(event.target.dataset.index);\n        players[0].lastPieceIndex = event.target.dataset.index;\n        console.log(`index: ${players[0].lastPieceIndex}`);\n      });\n      piece.appendChild(block);\n    }\n\n    return piece;\n  };\n\n  const twoLengthPiece = Piece(shipLength, players, boards[0].shipNumToPlace);\n\n  const margins = ['83px', '60px', '38px', '16px'];\n\n  switch (shipLength) {\n    case 2:\n      twoLengthPiece.style.marginLeft = margins[0];\n      break;\n    case 3:\n      twoLengthPiece.style.marginLeft = margins[1];\n      break;\n    case 4:\n      twoLengthPiece.style.marginLeft = margins[2];\n      break;\n    case 5:\n      twoLengthPiece.style.marginLeft = margins[3];\n      break;\n  }\n\n  twoLengthPiece.addEventListener('click', ev => {\n    ev.target.parentNode.classList.toggle('vertical');\n  });\n  twoLengthPiece.addEventListener('dragstart', ev => {\n    ev.dataTransfer.setData(\n      'text',\n      `${ev.target.classList.contains('vertical')}`\n    );\n  });\n\n  piecesContainer.appendChild(twoLengthPiece);\n};\n\nmodule.exports = { renderGridDivs };\n\n\n//# sourceURL=webpack:///./src/dom.js?");

/***/ }),

/***/ "./src/gameobjects.js":
/*!****************************!*\
  !*** ./src/gameobjects.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Player = playerType => {\n  let previousAttackPositions = [];\n  let lastPieceHoverIndex;\n\n  const attack = (board, pos) => {\n    if (previousAttackPositions.includes(pos)) {\n      return;\n    }\n    board.receiveAttack(pos);\n    previousAttackPositions.push(pos);\n  };\n\n  const aiAttack = board => {\n    if (playerType == 'human') {\n      return;\n    }\n    let positionToBeAttacked = Math.floor(Math.random() * 100 + 1);\n    if (previousAttackPositions.includes(positionToBeAttacked)) {\n      aiAttack(board);\n    } else {\n      board.receiveAttack(positionToBeAttacked);\n      previousAttackPositions.push(positionToBeAttacked);\n    }\n  };\n\n  return { attack, previousAttackPositions, aiAttack, lastPieceHoverIndex };\n};\n\nconst GameBoard = playerType => {\n  this.playerType = playerType;\n  let ships = [];\n  let missedAttackPositions = [];\n  let allShipsSunk = false;\n  let shipLengths = [2, 2, 2, 2, 3, 3, 3, 4, 4, 5];\n  let shipNumToPlace = 0;\n\n  const placeShipsDefault = () => {\n    const placePlayerShips = () => {\n      addShip([2, 12]);\n      addShip([90, 100]);\n      addShip([82, 83]);\n      addShip([6, 7]);\n      addShip([85, 86, 87]);\n      addShip([9, 19, 29]);\n      addShip([41, 51, 61]);\n      addShip([33, 34, 35, 36]);\n      addShip([49, 59, 69, 79]);\n      addShip([63, 64, 65, 66, 67]);\n    };\n\n    const placeAIShips = () => {\n      // create a ship with random positions with given length, runs recursively until legal ship is placed\n      const createShip = shipLength => {\n        let startingNumber = Math.floor(Math.random() * 100 + 1);\n        let myPositions = [startingNumber];\n        // < 0.5 = one number difference between positions (horizontal)\n        // > 0.5 = ten number difference (vertical)\n        let oneOrTen = Math.random();\n\n        if (oneOrTen < 0.5) {\n          for (let i = 0; i < shipLength - 1; i++) {\n            myPositions.push(myPositions[myPositions.length - 1] + 1);\n          }\n        } else {\n          for (let i = 0; i < shipLength - 1; i++) {\n            myPositions.push(myPositions[myPositions.length - 1] + 10);\n          }\n        }\n\n        // if ship is illegal, try new one\n        if (!addShip(myPositions)) {\n          createShip(shipLength);\n        }\n      };\n      shipLengths.forEach(length => {\n        createShip(length);\n      });\n    };\n\n    if (playerType == 'ai') {\n      placeAIShips();\n    } else {\n      placePlayerShips();\n    }\n  };\n\n  const checkIfAllShipsSunk = () => {\n    let shipPositions = 0,\n      hitPositions = 0;\n\n    ships.forEach(ship => {\n      ship.positions.forEach(positionItem => {\n        shipPositions++;\n        if (positionItem.isHit == true) {\n          hitPositions++;\n        }\n      });\n    });\n    if (shipPositions == hitPositions) {\n      return true;\n    } else {\n      return false;\n    }\n  };\n\n  const addShip = posArray => {\n    const newShipConflicts = () => {\n      let previousShipPositions = [];\n      ships.forEach(ship => {\n        ship.positions.forEach(positionItem => {\n          previousShipPositions.push(positionItem.position);\n        });\n      });\n\n      for (let i = 0; i < posArray.length; i++) {\n        if (previousShipPositions.includes(posArray[i])) {\n          return true;\n        }\n      }\n      return false;\n    };\n\n    const newShipWraps = () => {\n      for (let i = 10; i <= 90; i) {\n        if (posArray.includes(i) && posArray.includes(i + 1)) {\n          return true;\n        }\n        i += 10;\n      }\n      return false;\n    };\n\n    const shipHasUnadjacentPositions = () => {\n      const differenceBetweenPos = posArray[1] - posArray[0];\n      let tenArray = [posArray[0]];\n      let oneArray = [posArray[0]];\n\n      for (let i = 1; i <= posArray.length - 1; i++) {\n        tenArray.push(tenArray[tenArray.length - 1] + 10);\n      }\n      for (let i = 1; i <= posArray.length - 1; i++) {\n        oneArray.push(oneArray[oneArray.length - 1] + 1);\n      }\n\n      let matchesTen = true;\n      let matchesOne = true;\n\n      for (let i = 0; i < posArray.length; i++) {\n        if (posArray[i] != tenArray[i]) {\n          matchesTen = false;\n        }\n      }\n      for (let i = 0; i < posArray.length; i++) {\n        if (posArray[i] != oneArray[i]) {\n          matchesOne = false;\n        }\n      }\n\n      if (matchesTen || matchesOne) {\n        return false;\n      } else {\n        return true;\n      }\n    };\n\n    const shipIsOutOfBounds = () => {\n      for (let i = 0; i < posArray.length; i++) {\n        if (posArray[i] < 1 || posArray[i] > 100) {\n          return true;\n        }\n      }\n    };\n\n    if (\n      newShipConflicts() ||\n      newShipWraps() ||\n      shipHasUnadjacentPositions() ||\n      shipIsOutOfBounds()\n    ) {\n      return false;\n    }\n\n    const newShip = Ship();\n    newShip.setPositions(posArray);\n    ships.push(newShip);\n    return true;\n  };\n\n  const receiveAttack = pos => {\n    let attackMissed = true;\n    ships.forEach(ship => {\n      ship.positions.forEach(positionItem => {\n        if (positionItem.position == pos) {\n          ship.hit(pos);\n          attackMissed = false;\n        }\n      });\n    });\n    if (attackMissed) {\n      missedAttackPositions.push(pos);\n    }\n  };\n  const getPlayerType = () => playerType;\n\n  const getSunkenShipNumber = () => {\n    let sunkenShipNum = 0;\n    ships.forEach(ship => {\n      if (ship.isSunk()) {\n        sunkenShipNum++;\n      }\n    });\n    return sunkenShipNum;\n  };\n\n  return {\n    getPlayerType,\n    addShip,\n    ships,\n    receiveAttack,\n    missedAttackPositions,\n    checkIfAllShipsSunk,\n    placeShipsDefault,\n    getSunkenShipNumber,\n    shipNumToPlace,\n    shipLengths\n  };\n};\n\nconst Ship = () => {\n  let positions = [];\n\n  const setPositions = positionsArray => {\n    positionsArray.forEach(pos => {\n      positions.push({\n        position: pos,\n        isHit: false\n      });\n    });\n  };\n\n  const hit = targetPosition => {\n    positions.forEach(pos => {\n      if (targetPosition == pos.position) {\n        pos.isHit = true;\n      }\n    });\n  };\n\n  const isSunk = () => {\n    let hitPositions = 0;\n    for (let i = 0; i < positions.length; i++) {\n      if (positions[i].isHit == true) {\n        hitPositions++;\n      }\n    }\n\n    if (hitPositions < positions.length) {\n      return false;\n    } else {\n      return true;\n    }\n  };\n\n  return { isSunk, hit, setPositions, positions };\n};\n\nmodule.exports = {\n  Ship,\n  GameBoard,\n  Player\n};\n\n\n//# sourceURL=webpack:///./src/gameobjects.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const main = __webpack_require__(/*! ./gameobjects */ \"./src/gameobjects.js\");\nconst dom = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\nconst Ship = main.Ship,\n  GameBoard = main.GameBoard,\n  Player = main.Player;\n\nconst gameFlow = (() => {\n  let playerTurn = 1;\n  let boards = [GameBoard('human'), GameBoard('ai')];\n  let players = [Player('human'), Player('ai')];\n  let gameState = { hasStarted: false };\n\n  boards[1].placeShipsDefault();\n  // boards[0].placeShipsDefault();\n\n  const resetGame = () => {\n    boards = [GameBoard(1), GameBoard(2)];\n    players = [Player('human'), Player('ai')];\n  };\n\n  let gameHasStarted = false;\n  let aiFinishedPlay = true;\n\n  const posClickHandler = (pos, gameHasStarted) => {\n    if (aiFinishedPlay) {\n      players[0].attack(boards[1], pos);\n      console.log(boards[1].getSunkenShipNumber());\n      dom.renderGridDivs(boards, posClickHandler, players);\n      aiFinishedPlay = false;\n    }\n\n    setTimeout(() => {\n      if (aiFinishedPlay == false) {\n        players[1].aiAttack(boards[0]);\n        dom.renderGridDivs(boards, posClickHandler, players);\n        console.log(boards[0].getSunkenShipNumber());\n      }\n      aiFinishedPlay = true;\n    }, 600);\n  };\n\n  dom.renderGridDivs(boards, posClickHandler, players);\n})();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });