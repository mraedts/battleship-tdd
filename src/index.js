const main = require('./gameobjects');
const dom = require('./dom');
const Ship = main.Ship,
  GameBoard = main.GameBoard,
  Player = main.Player;

const gameFlow = (() => {
  let playerTurn = 1;
  let boards = [GameBoard('human'), GameBoard('ai')];
  let players = [Player('human'), Player('ai')];
  const winnerText = document.querySelector('#winner-text');
  const clearBoardButton = document.querySelector('#clear-board-button');
  const restartButton = document.querySelector('#button-wrapper');
  const friendlyShipsSunk = document.querySelector('#friendly-ships-sunk');
  const enemyShipsSunk = document.querySelector('#enemy-ships-sunk');
  const piecesContainer = document.querySelector('#pieces-container');
  const rotateText = document.querySelector('#rotate-text');
  const gameState = {
    numPlacedShips: 0,
    aiFinishedTurn: true,
    hasStarted: false,
    hasFinished: false
  };
  boards[1].placeShipsDefault();

  clearBoardButton.addEventListener('click', event => {
    boards[0] = GameBoard('human');
    renderPlayerBoard();
  });

  restartButton.addEventListener('click', () => reset());

  const reset = () => {
    friendlyShipsSunk.style.display = 'none';
    enemyShipsSunk.style.visibility = 'hidden';
    winnerText.style.visibility = 'hidden';
    restartButton.style.visibility = 'hidden';
    piecesContainer.style.display = 'block';
    clearBoardButton.style.display = 'block';
    gameState.numPlacedShips = 0;
    gameState.aiFinishedTurn = true;
    gameState.hasStarted = false;
    gameState.hasFinished = false;
    document.querySelector('#friendly-ships-sunk-num').textContent = 0;
    document.querySelector('#enemy-ships-sunk-num').textContent = 0;

    boards[0] = GameBoard('human');
    boards[1] = GameBoard('ai');
    players[0] = Player('human');
    players[1] = Player('ai');
    boards[1].placeShipsDefault();
    renderPlayerBoard();
    renderAIBoard(boards);
  };

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
      const ship = createShipArray(isVertical, pos, boards);

      if (boards[0].addShip(ship) != false) {
        if (boards[0].shipNumToPlace == 9) {
          const enemyGridDivs = document.querySelectorAll('.grid-div-enemy');
          enemyGridDivs.forEach(div => {
            div.style.backgroundColor = 'white';
          });
          gameState.hasStarted = true;
          piecesContainer.style.display = 'none';
          friendlyShipsSunk.style.display = 'block';
          enemyShipsSunk.style.visibility = 'visible';
          rotateText.style.visibility = 'hidden';

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
        if (
          gameState.hasStarted &&
          gameState.aiFinishedTurn &&
          gameState.hasFinished == false
        ) {
          gameState.aiFinishedTurn = false;
          if (players[0].attack(boards[1], pos) == false) {
            gameState.aiFinishedTurn = true;
            renderAIBoard(boards);
            return;
          }

          renderAIBoard();
          if (boards[1].getSunkenShipNumber() == 10) {
            winnerText.textContent = 'You won!';
            winnerText.style.visibility = 'visible';
            gameState.hasFinished = true;
            restartButton.style.visibility = 'visible';
          }

          enemySunkenShips.textContent = boards[1].getSunkenShipNumber();

          setTimeout(() => {
            players[1].aiAttack(boards[0]);

            renderPlayerBoard();
            if (boards[0].getSunkenShipNumber() == 10) {
              winnerText.textContent = 'Computer won!';
              winnerText.style.visibility = 'visible';
              gameState.hasFinished = true;
              restartButton.style.visibility = 'visible';
            }
            friendlySunkenShips.textContent = boards[0].getSunkenShipNumber();
            gameState.aiFinishedTurn = true;
          }, 300);
        }
      });
    });
  }

  renderAIBoard(boards);
  renderPlayerBoard();
})();
