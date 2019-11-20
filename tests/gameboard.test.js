const main = require('../main');
const gameBoard = main.gameBoardOne;

it('test works', () => {
  expect(gameBoard.getPlayerNumber()).toBe(1);
});

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
