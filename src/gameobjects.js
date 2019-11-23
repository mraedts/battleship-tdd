const Player = playerType => {
  let previousAttackPositions = [];
  let lastPieceHoverIndex;

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
    } else {
      board.receiveAttack(positionToBeAttacked);
      previousAttackPositions.push(positionToBeAttacked);
    }
  };

  return { attack, previousAttackPositions, aiAttack, lastPieceHoverIndex };
};

const GameBoard = playerType => {
  this.playerType = playerType;
  let ships = [];
  let missedAttackPositions = [];
  let allShipsSunk = false;
  let shipLengths = [2, 2, 2, 2, 3, 3, 3, 4, 4, 5];
  let shipNumToPlace = 0;

  const placeShipsDefault = () => {
    const placePlayerShips = () => {
      addShip([2, 12]);
      addShip([90, 100]);
      addShip([82, 83]);
      addShip([6, 7]);
      addShip([85, 86, 87]);
      addShip([9, 19, 29]);
      addShip([41, 51, 61]);
      addShip([33, 34, 35, 36]);
      addShip([49, 59, 69, 79]);
      addShip([63, 64, 65, 66, 67]);
    };

    const placeAIShips = () => {
      // create a ship with random positions with given length, runs recursively until legal ship is placed
      const createShip = shipLength => {
        let startingNumber = Math.floor(Math.random() * 100 + 1);
        let myPositions = [startingNumber];
        // < 0.5 = one number difference between positions (horizontal)
        // > 0.5 = ten number difference (vertical)
        let oneOrTen = Math.random();

        if (oneOrTen < 0.5) {
          for (let i = 0; i < shipLength - 1; i++) {
            myPositions.push(myPositions[myPositions.length - 1] + 1);
          }
        } else {
          for (let i = 0; i < shipLength - 1; i++) {
            myPositions.push(myPositions[myPositions.length - 1] + 10);
          }
        }

        // if ship is illegal, try new one
        if (!addShip(myPositions)) {
          createShip(shipLength);
        }
      };
      shipLengths.forEach(length => {
        createShip(length);
      });
    };

    if (playerType == 'ai') {
      placeAIShips();
    } else {
      placePlayerShips();
    }
  };

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
    const newShipConflicts = () => {
      let previousShipPositions = [];
      ships.forEach(ship => {
        ship.positions.forEach(positionItem => {
          previousShipPositions.push(positionItem.position);
        });
      });

      for (let i = 0; i < posArray.length; i++) {
        if (previousShipPositions.includes(posArray[i])) {
          return true;
        }
      }
      return false;
    };

    const newShipWraps = () => {
      for (let i = 10; i <= 90; i) {
        if (posArray.includes(i) && posArray.includes(i + 1)) {
          return true;
        }
        i += 10;
      }
      return false;
    };

    const shipHasUnadjacentPositions = () => {
      const differenceBetweenPos = posArray[1] - posArray[0];
      let tenArray = [posArray[0]];
      let oneArray = [posArray[0]];

      for (let i = 1; i <= posArray.length - 1; i++) {
        tenArray.push(tenArray[tenArray.length - 1] + 10);
      }
      for (let i = 1; i <= posArray.length - 1; i++) {
        oneArray.push(oneArray[oneArray.length - 1] + 1);
      }

      let matchesTen = true;
      let matchesOne = true;

      for (let i = 0; i < posArray.length; i++) {
        if (posArray[i] != tenArray[i]) {
          matchesTen = false;
        }
      }
      for (let i = 0; i < posArray.length; i++) {
        if (posArray[i] != oneArray[i]) {
          matchesOne = false;
        }
      }

      if (matchesTen || matchesOne) {
        return false;
      } else {
        return true;
      }
    };

    const shipIsOutOfBounds = () => {
      for (let i = 0; i < posArray.length; i++) {
        if (posArray[i] < 1 || posArray[i] > 100) {
          return true;
        }
      }
    };

    if (
      newShipConflicts() ||
      newShipWraps() ||
      shipHasUnadjacentPositions() ||
      shipIsOutOfBounds()
    ) {
      return false;
    }

    const newShip = Ship();
    newShip.setPositions(posArray);
    ships.push(newShip);
    return true;
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
  const getPlayerType = () => playerType;

  const getSunkenShipNumber = () => {
    let sunkenShipNum = 0;
    ships.forEach(ship => {
      if (ship.isSunk()) {
        sunkenShipNum++;
      }
    });
    return sunkenShipNum;
  };

  return {
    getPlayerType,
    addShip,
    ships,
    receiveAttack,
    missedAttackPositions,
    checkIfAllShipsSunk,
    placeShipsDefault,
    getSunkenShipNumber,
    shipNumToPlace,
    shipLengths
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

  return { isSunk, hit, setPositions, positions };
};

module.exports = {
  Ship,
  GameBoard,
  Player
};
