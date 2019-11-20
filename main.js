const Player = playerType => {
  let previousAttackPositions = [];

  const attack = (board, pos) => {
    if (previousAttackPositions.includes(pos)) {
      return;
    }
    board.receiveAttack(pos);
    previousAttackPositions.push(pos);
  };

  const aiAttack = board => {
    if (playerType == 'human') {
      return;
    }
    let positionToBeAttacked = Math.floor(Math.random() * 100 + 1);
    if (previousAttackPositions.includes(positionToBeAttacked)) {
      aiAttack(board);
    } else if (previousAttackPositions.length < 100) {
      board.receiveAttack(positionToBeAttacked);
      previousAttackPositions.push(positionToBeAttacked);
    }
  };

  return { attack, previousAttackPositions, aiAttack };
};

const GameBoard = playerNumber => {
  this.playerNumber = playerNumber;
  let ships = [];
  let missedAttackPositions = [];
  let allShipsSunk = false;

  const checkIfAllShipsSunk = () => {
    let shipPositions = 0,
      hitPositions = 0;

    ships.forEach(ship => {
      ship.positions.forEach(positionItem => {
        shipPositions++;
        if (positionItem.isHit == true) {
          hitPositions++;
        }
      });
    });
    if (shipPositions == hitPositions) {
      return true;
    } else {
      return false;
    }
  };

  const addShip = posArray => {
    const newShip = Ship();

    newShip.setPositions(posArray);

    ships.push(newShip);
  };

  const receiveAttack = pos => {
    let attackMissed = true;
    ships.forEach(ship => {
      ship.positions.forEach(positionItem => {
        if (positionItem.position == pos) {
          ship.hit(pos);
          attackMissed = false;
        }
      });
    });
    if (attackMissed) {
      missedAttackPositions.push(pos);
    }
  };

  const getShips = () => ships;
  const getPlayerNumber = () => playerNumber;

  return {
    getPlayerNumber,
    addShip,
    getShips,
    ships,
    receiveAttack,
    missedAttackPositions,
    checkIfAllShipsSunk
  };
};

const Ship = () => {
  let positions = [];

  const setPositions = positionsArray => {
    positionsArray.forEach(pos => {
      positions.push({
        position: pos,
        isHit: false
      });
    });
  };

  const hit = targetPosition => {
    positions.forEach(pos => {
      if (targetPosition == pos.position) {
        pos.isHit = true;
      }
    });
  };

  const isSunk = () => {
    let hitPositions = 0;
    for (let i = 0; i < positions.length; i++) {
      if (positions[i].isHit == true) {
        hitPositions++;
      }
    }

    if (hitPositions < positions.length) {
      return false;
    } else {
      return true;
    }
  };

  const getPositions = () => {
    return positions;
  };
  return { isSunk, hit, setPositions, getPositions, positions };
};

const shipOne = Ship(1);
const gameBoardOne = GameBoard(1);
const gameBoardTwo = GameBoard(2);
const playerHuman = Player('human');
const playerAI = Player('ai');

module.exports = {
  shipOne,
  gameBoardOne,
  gameBoardTwo,
  playerHuman,
  playerAI
};
