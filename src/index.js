const main = require('./gameobjects');
const dom = require('./dom');
const Ship = main.Ship,
  GameBoard = main.GameBoard,
  Player = main.Player;

const gameFlow = (() => {
  let playerTurn = 1;
  let boards = [GameBoard(1), GameBoard(2)];
  let players = [Player('human'), Player('ai')];

  // boards[0].addShip([25, 35, 35, 45, 55]);

  // boards[0].addShip([81, 82, 83, 84, 85]);

  // boards[0].receiveAttack(1);
  // boards[0].receiveAttack(6);

  // boards[0].receiveAttack(25);
  // boards[0].receiveAttack(35);
  // boards[0].receiveAttack(45);
  // boards[0].receiveAttack(55);

  // boards[0].receiveAttack(84);

  boards[0].placeShipsDefault();

  const resetGame = () => {
    boards = [GameBoard(1), GameBoard(2)];
    players = [Player('human'), Player('ai')];
  };

  dom.renderGridDivs(boards);

  boards[0].ships.forEach(ship => {
    console.log(ship.positions);
  });
})();
