const main = require('./gameobjects');
const dom = require('./dom');
const Ship = main.Ship,
  GameBoard = main.GameBoard,
  Player = main.Player;

const gameFlow = (() => {
  let playerTurn = 1;
  let boards = [GameBoard('human'), GameBoard('ai')];
  let players = [Player('human'), Player('ai')];
  const gameState = {
    numPlacedShips: 0,
    aiFinishedTurn: true,
    hasStarted: false,
    hasFinished: false
  };
  boards[1].placeShipsDefault();

  const clearBoardButton = document.querySelector('#clear-board-button');

  clearBoardButton.addEventListener('click', event => {
    boards[0] = GameBoard('human');
    renderPlayerBoard();
  });

  const addDropHandler = div => {
    div.addEventListener('dragover', event => {
      console.log(event.target.dataset.pos);
      event.preventDefault();
    });

    const createShipArray = (isVertical, pos, boards) => {
      //create ship based on orientation, dropped position and drag starting point
      const shipLength = boards[0].shipLengths[boards[0].shipNumToPlace];
      const lastPieceIndex = players[0].lastPieceIndex;
      let difference = lastPieceIndex - 1;
      let shipArray = [];
      let multiplier = 1;
      if (isVertical) {
        multiplier = 10;
      }

      for (let i = 1; i <= shipLength; i++) {
        if (i < lastPieceIndex) {
          shipArray.push(pos - difference * multiplier);
          difference--;
        } else if (i == lastPieceIndex) {
          shipArray.push(pos);
          difference = 1;
        } else {
          shipArray.push(pos + difference * multiplier);
          difference++;
        }
      }

      console.log(shipArray);
      return shipArray;
    };

    div.addEventListener('drop', event => {
      event.preventDefault();

      const pos = Number(event.target.dataset.pos);
      const isVertical = JSON.parse(event.dataTransfer.getData('text'));
      const friendlyShipsSunk = document.querySelector('#friendly-ships-sunk');
      const enemyShipsSunk = document.querySelector('#enemy-ships-sunk');
      const ship = createShipArray(isVertical, pos, boards);

      if (boards[0].addShip(ship) != false) {
        if (boards[0].shipNumToPlace == 9) {
          const piecesContainer = document.querySelector('#pieces-container');
          const enemyGridDivs = document.querySelectorAll('.grid-div-enemy');
          enemyGridDivs.forEach(div => {
            div.style.backgroundColor = 'white';
          });
          gameState.hasStarted = true;
          piecesContainer.style.display = 'none';
          friendlyShipsSunk.style.display = 'block';
          enemyShipsSunk.style.visibility = 'visible';
          console.log(gameState.hasStarted);
          clearBoardButton.style.display = 'none';
        }

        boards[0].shipNumToPlace++;
        renderPlayerBoard();
      }
    });
  };

  function renderPlayerBoard() {
    const playerBoard = boards[0];
    dom.renderPlayerBoardDivs(playerBoard);

    const friendlyGridDivs = document.querySelectorAll('.grid-div-friendly');

    friendlyGridDivs.forEach(div => {
      addDropHandler(div);
    });

    dom.renderPiecesToPlace(players, boards);
  }

  function renderAIBoard() {
    dom.renderAIBoard(boards, gameState.hasStarted);
    const enemyGridDivs = document.querySelectorAll('.grid-div-enemy');
    const friendlySunkenShips = document.querySelector(
      '#friendly-ships-sunk-num'
    );
    const enemySunkenShips = document.querySelector('#enemy-ships-sunk-num');
    enemyGridDivs.forEach(div => {
      const pos = div.dataset.pos;
      div.addEventListener('click', () => {
        if (gameState.hasStarted && gameState.aiFinishedTurn) {
          gameState.aiFinishedTurn = false;
          if (players[0].attack(boards[1], pos) == false) {
            gameState.aiFinishedTurn = true;
            renderAIBoard(boards);
            return;
          }

          renderAIBoard();
          enemySunkenShips.textContent = boards[1].getSunkenShipNumber();

          setTimeout(() => {
            players[1].aiAttack(boards[0]);

            renderPlayerBoard();
            friendlySunkenShips.textContent = boards[0].getSunkenShipNumber();
            gameState.aiFinishedTurn = true;
          }, 600);
        }
      });
    });
  }

  renderAIBoard(boards);
  renderPlayerBoard();
})();
