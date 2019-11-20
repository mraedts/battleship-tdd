const main = require('../main');
const gameBoardOne = main.gameBoardOne;
const gameBoardTwo = main.gameBoardTwo;
const playerHuman = main.playerHuman;
const playerAI = main.playerAI;

it('attacks opposite player', () => {
  playerHuman.attack(gameBoardOne, 18);
  expect(gameBoardOne.missedAttackPositions).toEqual([18]);
});

it('records previous attack positions', () => {
  playerHuman.attack(gameBoardOne, 20);
  expect(playerHuman.previousAttackPositions).toEqual([18, 20]);
});

it('ai makes random legal plays', () => {
  let testArray = [];
  for (let i = 1; i <= 100; i++) {
    playerAI.aiAttack(gameBoardTwo);
  }
  for (let i = 1; i <= 100; i++) {
    testArray.push(i);
  }

  const sortedArray = gameBoardTwo.missedAttackPositions.sort((prev, cur) => {
    if (prev > cur) {
      return 1;
    } else {
      return -1;
    }
  });

  expect(sortedArray).toEqual(testArray);
});
