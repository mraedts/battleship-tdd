const main = require('../src/gameobjects');
const GameBoard = main.GameBoard;

const gameBoard = GameBoard(1);
const gameBoardTwo = GameBoard(1);
const gameBoardThree = GameBoard(1);
const gameBoardFour = GameBoard(1);

it('adds ships', () => {
  gameBoard.addShip([1, 2, 3, 4]);
  gameBoard.addShip([11, 21, 31, 41]);

  expect(gameBoard.ships[0].positions).toEqual([
    { position: 1, isHit: false },
    { position: 2, isHit: false },
    { position: 3, isHit: false },
    { position: 4, isHit: false }
  ]);
});

it('refuses to add ship when a position is already occupied', () => {
  gameBoardTwo.addShip([12, 13, 14, 15]);
  gameBoardTwo.addShip([15, 25, 35, 45, 55]);

  expect(gameBoardTwo.ships[1]).toBe(undefined);
});

it('refuses to add ship that wraps (from pos 10 to 11, 30 to 31, etc)', () => {
  gameBoardThree.addShip([10, 11, 12, 13]);
  gameBoardThree.addShip([58, 59, 60, 61, 62]);
  gameBoardThree.addShip([11, 12, 13, 14]);

  expect(gameBoardThree.ships[0].positions).toEqual([
    { position: 11, isHit: false },
    { position: 12, isHit: false },
    { position: 13, isHit: false },
    { position: 14, isHit: false }
  ]);
});

it('refuses to add ship with unadjacent positions', () => {
  gameBoardFour.addShip([1, 3, 4, 5, 6]);
  gameBoardFour.addShip([26, 46, 56, 76, 86]);
  gameBoardFour.addShip([91, 92, 93, 94]);

  expect(gameBoardFour.ships[0].positions).toEqual([
    { position: 91, isHit: false },
    { position: 92, isHit: false },
    { position: 93, isHit: false },
    { position: 94, isHit: false }
  ]);
});

it('receives attacks', () => {
  gameBoard.receiveAttack(21);

  expect(gameBoard.ships[1].positions).toEqual([
    { position: 11, isHit: false },
    { position: 21, isHit: true },
    { position: 31, isHit: false },
    { position: 41, isHit: false }
  ]);
});

it('reports sunken ships', () => {
  gameBoard.receiveAttack(11);
  gameBoard.receiveAttack(31);
  gameBoard.receiveAttack(41);

  expect(gameBoard.ships[1].isSunk()).toBe(true);
});

it('records missed attack', () => {
  gameBoard.receiveAttack(86);
  gameBoard.receiveAttack(65);
  gameBoard.receiveAttack(7);
  gameBoard.receiveAttack(63);
  expect(gameBoard.missedAttackPositions).toEqual([86, 65, 7, 63]);
});

it('checks if all ships on board are sunk', () => {
  expect(gameBoard.checkIfAllShipsSunk()).toBe(false);
  gameBoard.receiveAttack(1);
  gameBoard.receiveAttack(2);
  gameBoard.receiveAttack(3);
  gameBoard.receiveAttack(4);
  expect(gameBoard.checkIfAllShipsSunk()).toBe(true);
});
