const main = require('./gameobjects');
const dom = require('./dom');
const Ship = main.Ship,
  GameBoard = main.GameBoard,
  Player = main.Player;

const gameFlow = (() => {
  let playerTurn = 1;
  let boards = [GameBoard('human'), GameBoard('ai')];
  let players = [Player('human'), Player('ai')];

  boards[1].placeShipsDefault();
  boards[0].placeShipsDefault();

  const resetGame = () => {
    boards = [GameBoard(1), GameBoard(2)];
    players = [Player('human'), Player('ai')];
  };

  let aiFinishedPlay = true;
  const posClickHandler = pos => {
    if (aiFinishedPlay) {
      players[0].attack(boards[1], pos);
      console.log(boards[1].getSunkenShipNumber());
      dom.renderGridDivs(boards, posClickHandler);
      aiFinishedPlay = false;
    }

    setTimeout(() => {
      if (aiFinishedPlay == false) {
        players[1].aiAttack(boards[0]);
        dom.renderGridDivs(boards, posClickHandler);
        console.log(boards[0].getSunkenShipNumber());
      }
      aiFinishedPlay = true;
    }, 600);
  };

  dom.renderGridDivs(boards, posClickHandler);
})();
