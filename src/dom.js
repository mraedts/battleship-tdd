const renderGridDivs = (boards, clickPosHandler, players, gameState) => {
  const gameBoardGrids = document.querySelectorAll('.gameboard-grid'),
    colors = [
      '#badaf7',
      '#091476',
      '#5ea9ed',
      '#3090e8',
      '#1776cf',
      '#125ca1',
      '#0d4273',
      '#082745',
      '#1f6b93',
      '#1025d5'
    ];

  gameBoardGrids.forEach(grid => {
    grid.innerHTML = '';
  });

  const getColor = (shipPositions, i) => {
    if (shipPositions.includes(i)) {
      if (shipPositions.indexOf(i) < 2) {
        return colors[0];
      } else if (shipPositions.indexOf(i) < 4) {
        return colors[1];
      } else if (shipPositions.indexOf(i) < 6) {
        return colors[2];
      } else if (shipPositions.indexOf(i) < 8) {
        return colors[3];
      } else if (shipPositions.indexOf(i) < 11) {
        return colors[4];
      } else if (shipPositions.indexOf(i) < 14) {
        return colors[5];
      } else if (shipPositions.indexOf(i) < 17) {
        return colors[6];
      } else if (shipPositions.indexOf(i) < 21) {
        return colors[7];
      } else if (shipPositions.indexOf(i) < 25) {
        return colors[8];
      } else if (shipPositions.indexOf(i) < 30) {
        return colors[9];
      }
    }
  };
  const renderPlayerBoard = () => {
    const playerBoardGrid = gameBoardGrids[0],
      playerBoard = boards[0];

    playerBoardGrid.innerHTML = '';

    const getHitArray = () => {
      let hitPositions = [];
      playerBoard.ships.forEach(ship => {
        ship.positions.forEach(positionItem => {
          if (positionItem.isHit) {
            hitPositions.push(positionItem.position);
          }
        });
      });
      return hitPositions;
    };

    const getShipArray = () => {
      let shipPositions = [];
      playerBoard.ships.forEach(ship => {
        ship.positions.forEach(positionItem => {
          shipPositions.push(positionItem.position);
        });
      });
      return shipPositions;
    };

    for (let i = 1; i <= 100; i++) {
      const hitPositions = getHitArray();
      const shipPositions = getShipArray();

      const div = document.createElement('div');
      div.dataset.pos = i;
      div.classList.add('grid-div');

      if (i == 1 || i % 10 == 1) {
        div.style.borderLeftColor = 'grey';
      }

      if (i <= 10) {
        div.style.borderTopColor = 'grey';
      }

      div.style.backgroundColor = getColor(shipPositions, i);

      if (playerBoard.missedAttackPositions.includes(i)) {
        div.textContent = '';
        const img = document.createElement('img');
        img.src = './img/miss.png';
        img.style.height = '35px';
        img.style.width = '35px';
        img.style.paddingTop = '7px';
        div.appendChild(img);
      } else if (hitPositions.includes(i)) {
        div.textContent = '';
        const img = document.createElement('img');
        img.src = './img/explosion.png';
        img.style.height = '45px';
        img.style.width = '45px';
        img.style.paddingTop = '1px';
        div.appendChild(img);
      }

      const addDropHandler = () => {
        div.addEventListener('dragover', event => {
          event.preventDefault();
        });

        const createShipArray = (isVertical, pos) => {
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
          const friendlyShipsSunk = document.querySelector(
            '#friendly-ships-sunk'
          );
          const enemyShipsSunk = document.querySelector('#enemy-ships-sunk');
          const ship = createShipArray(isVertical, pos);
          if (boards[0].addShip(ship) != false) {
            if (boards[0].shipNumToPlace == 9) {
              const piecesContainer = document.querySelector(
                '#pieces-container'
              );
              gameHasStarted = 9;
              piecesContainer.style.display = 'none';
              friendlyShipsSunk.style.display = 'block';
              enemyShipsSunk.style.visibility = 'visible';
            }

            boards[0].shipNumToPlace++;
            renderPiecesToPlace(players, boards);
          }

          renderPlayerBoard();
        });
        playerBoardGrid.appendChild(div);
      };

      addDropHandler();
      playerBoardGrid.appendChild(div);
    }
  };

  const renderAIBoard = () => {
    const playerBoardGrid = gameBoardGrids[1],
      playerBoard = boards[1];

    playerBoardGrid.innerHTML = '';
    const getHitArray = () => {
      let hitPositions = [];
      playerBoard.ships.forEach(ship => {
        ship.positions.forEach(positionItem => {
          if (positionItem.isHit) {
            hitPositions.push(positionItem.position);
          }
        });
      });
      return hitPositions;
    };

    const getShipArray = () => {
      let shipPositions = [];
      playerBoard.ships.forEach(ship => {
        ship.positions.forEach(positionItem => {
          shipPositions.push(positionItem.position);
        });
      });
      return shipPositions;
    };

    for (let i = 1; i <= 100; i++) {
      const hitPositions = getHitArray();
      const shipPositions = getShipArray();

      const div = document.createElement('div');
      div.dataset.pos = i;
      div.classList.add('grid-div');

      div.style.backgroundColor = getColor(shipPositions, i);

      if (i == 1 || i % 10 == 1) {
        div.style.borderLeftColor = 'grey';
      }

      if (i <= 10) {
        div.style.borderTopColor = 'grey';
      }

      if (playerBoard.missedAttackPositions.includes(i)) {
        div.textContent = '';
        const img = document.createElement('img');
        img.src = './img/miss.png';
        img.style.height = '35px';
        img.style.width = '35px';
        img.style.paddingTop = '7px';
        div.appendChild(img);
      } else if (hitPositions.includes(i)) {
        div.textContent = '';
        const img = document.createElement('img');
        img.src = './img/explosion.png';
        img.style.height = '45px';
        img.style.width = '45px';
        img.style.paddingTop = '1px';
        div.appendChild(img);
      } else {
        div.addEventListener('click', () => {
          clickPosHandler(i);
        });
      }

      playerBoardGrid.appendChild(div);
    }
  };

  const setSunkenShipCounts = () => {
    const friendlySunkenShipsDisplay = document.querySelector(
      '#friendly-ships-sunk'
    );
    const enemySunkenShipsDisplay = document.querySelector('#enemy-ships-sunk');

    friendlySunkenShipsDisplay.textContent = `Friendly ships sunk: ${boards[0].getSunkenShipNumber()}`;
    enemySunkenShipsDisplay.textContent = `Enemy ships sunk: ${boards[1].getSunkenShipNumber()}`;
  };

  setSunkenShipCounts();
  renderPlayerBoard();
  renderAIBoard();
  renderPiecesToPlace(players, boards);
};

const Piece = (shipLength, players) => {
  const piece = document.createElement('div');
  piece.id = 'piece-grid';
  piece.style.position = 'absolute';
  piece.setAttribute('draggable', true);
  piece.style.width = `${45 * shipLength}px`;
  piece.style.gridTemplateColumns = `repeat(${shipLength}, 1fr)`;

  for (let i = 0; i < shipLength; i++) {
    const block = document.createElement('div');
    block.dataset.index = i + 1;
    block.id = 'regular-block';
    block.classList.add('block');
    block.addEventListener('mouseover', event => {
      console.log(event.target.dataset.index);
      players[0].lastPieceIndex = event.target.dataset.index;
      console.log(`index: ${players[0].lastPieceIndex}`);
    });
    piece.appendChild(block);
  }

  return piece;
};

// const renderPiecesToPlace = (players, boards) => {
//   const shipLength = boards[0].shipLengths[boards[0].shipNumToPlace];

//   const piecesContainer = document.querySelector('#pieces-container');
//   piecesContainer.innerHTML = '';

//   const Piece = (shipLength, players, numToPlace) => {
//     const colors = [
//       '#badaf7',
//       '#091476',
//       '#5ea9ed',
//       '#3090e8',
//       '#1776cf',
//       '#125ca1',
//       '#0d4273',
//       '#082745',
//       '#1f6b93',
//       '#1025d5'
//     ];

//     const piece = document.createElement('div');
//     piece.id = 'piece-grid';
//     piece.style.position = 'absolute';
//     piece.setAttribute('draggable', true);
//     piece.style.width = `${45 * shipLength}px`;
//     piece.style.gridTemplateColumns = `repeat(${shipLength}, 1fr)`;

//     for (let i = 0; i < shipLength; i++) {
//       const block = document.createElement('div');
//       block.dataset.index = i + 1;
//       block.id = 'regular-block';
//       block.classList.add('block');
//       block.style.backgroundColor = colors[numToPlace];
//       block.addEventListener('mouseover', event => {
//         console.log(event.target.dataset.index);
//         players[0].lastPieceIndex = event.target.dataset.index;
//         console.log(`index: ${players[0].lastPieceIndex}`);
//       });
//       piece.appendChild(block);
//     }

//     return piece;
//   };

//   const twoLengthPiece = Piece(shipLength, players, boards[0].shipNumToPlace);

//   const margins = ['83px', '60px', '38px', '16px'];

//   switch (shipLength) {
//     case 2:
//       twoLengthPiece.style.marginLeft = margins[0];
//       break;
//     case 3:
//       twoLengthPiece.style.marginLeft = margins[1];
//       break;
//     case 4:
//       twoLengthPiece.style.marginLeft = margins[2];
//       break;
//     case 5:
//       twoLengthPiece.style.marginLeft = margins[3];
//       break;
//   }

//   twoLengthPiece.addEventListener('click', ev => {
//     ev.target.parentNode.classList.toggle('vertical');
//   });
//   twoLengthPiece.addEventListener('dragstart', ev => {
//     ev.dataTransfer.setData(
//       'text',
//       `${ev.target.classList.contains('vertical')}`
//     );
//   });

//   piecesContainer.appendChild(twoLengthPiece);
// };

const renderPlayerBoardDivs = (playerBoard, pos) => {
  const gameBoardGrids = document.querySelectorAll('.gameboard-grid');
  const playerBoardGrid = gameBoardGrids[0];
  const colors = [
    '#badaf7',
    '#091476',
    '#5ea9ed',
    '#3090e8',
    '#1776cf',
    '#125ca1',
    '#0d4273',
    '#082745',
    '#1f6b93',
    '#1025d5'
  ];

  const getColor = (shipPositions, i) => {
    if (shipPositions.includes(i)) {
      if (shipPositions.indexOf(i) < 2) {
        return colors[0];
      } else if (shipPositions.indexOf(i) < 4) {
        return colors[1];
      } else if (shipPositions.indexOf(i) < 6) {
        return colors[2];
      } else if (shipPositions.indexOf(i) < 8) {
        return colors[3];
      } else if (shipPositions.indexOf(i) < 11) {
        return colors[4];
      } else if (shipPositions.indexOf(i) < 14) {
        return colors[5];
      } else if (shipPositions.indexOf(i) < 17) {
        return colors[6];
      } else if (shipPositions.indexOf(i) < 21) {
        return colors[7];
      } else if (shipPositions.indexOf(i) < 25) {
        return colors[8];
      } else if (shipPositions.indexOf(i) < 30) {
        return colors[9];
      }
    }
  };

  playerBoardGrid.innerHTML = '';

  const getHitArray = () => {
    let hitPositions = [];
    playerBoard.ships.forEach(ship => {
      ship.positions.forEach(positionItem => {
        if (positionItem.isHit) {
          hitPositions.push(positionItem.position);
        }
      });
    });
    return hitPositions;
  };

  const getShipArray = () => {
    let shipPositions = [];
    playerBoard.ships.forEach(ship => {
      ship.positions.forEach(positionItem => {
        shipPositions.push(positionItem.position);
      });
    });
    return shipPositions;
  };

  for (let i = 1; i <= 100; i++) {
    const hitPositions = getHitArray();
    const shipPositions = getShipArray();

    const div = document.createElement('div');
    div.dataset.pos = i;
    div.classList.add('grid-div-friendly');

    if (i == 1 || i % 10 == 1) {
      div.style.borderLeftColor = 'grey';
    }

    if (i <= 10) {
      div.style.borderTopColor = 'grey';
    }

    div.style.backgroundColor = getColor(shipPositions, i);

    if (playerBoard.missedAttackPositions.includes(i)) {
      div.textContent = '';
      const img = document.createElement('img');
      img.src = './img/miss.png';
      img.style.height = '35px';
      img.style.width = '35px';
      img.style.paddingTop = '7px';
      div.appendChild(img);
    } else if (hitPositions.includes(i)) {
      div.textContent = '';
      const img = document.createElement('img');
      img.src = './img/explosion.png';
      img.style.height = '45px';
      img.style.width = '45px';
      img.style.paddingTop = '1px';
      div.appendChild(img);
    }

    const addDropHandler = () => {
      div.addEventListener('dragover', event => {
        event.preventDefault();
      });

      const createShipArray = (isVertical, pos) => {
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
      const getColor = (shipPositions, i) => {
        if (shipPositions.includes(i)) {
          if (shipPositions.indexOf(i) < 2) {
            return colors[0];
          } else if (shipPositions.indexOf(i) < 4) {
            return colors[1];
          } else if (shipPositions.indexOf(i) < 6) {
            return colors[2];
          } else if (shipPositions.indexOf(i) < 8) {
            return colors[3];
          } else if (shipPositions.indexOf(i) < 11) {
            return colors[4];
          } else if (shipPositions.indexOf(i) < 14) {
            return colors[5];
          } else if (shipPositions.indexOf(i) < 17) {
            return colors[6];
          } else if (shipPositions.indexOf(i) < 21) {
            return colors[7];
          } else if (shipPositions.indexOf(i) < 25) {
            return colors[8];
          } else if (shipPositions.indexOf(i) < 30) {
            return colors[9];
          }
        }
      };
      playerBoardGrid.appendChild(div);
    };
    playerBoardGrid.appendChild(div);
  }
};

const addDropHandler = div => {
  div.addEventListener('dragover', event => {
    event.preventDefault();
    console.log(event.target);
  });

  const createShipArray = (isVertical, pos) => {
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
    const ship = createShipArray(isVertical, pos);
    if (boards[0].addShip(ship) != false) {
      if (boards[0].shipNumToPlace == 9) {
        const piecesContainer = document.querySelector('#pieces-container');
        gameHasStarted = 9;
        piecesContainer.style.display = 'none';
        friendlyShipsSunk.style.display = 'block';
        enemyShipsSunk.style.visibility = 'visible';
      }

      boards[0].shipNumToPlace++;
    }
  });
};

const renderPiecesToPlace = (players, boards) => {
  const shipLength = boards[0].shipLengths[boards[0].shipNumToPlace];

  const piecesContainer = document.querySelector('#pieces-container');
  piecesContainer.innerHTML = '';

  const Piece = (shipLength, players, numToPlace) => {
    const colors = [
      '#badaf7',
      '#091476',
      '#5ea9ed',
      '#3090e8',
      '#1776cf',
      '#125ca1',
      '#0d4273',
      '#082745',
      '#1f6b93',
      '#1025d5'
    ];

    const piece = document.createElement('div');
    piece.id = 'piece-grid';
    piece.style.position = 'absolute';
    piece.setAttribute('draggable', true);
    piece.style.width = `${45 * shipLength}px`;
    piece.style.gridTemplateColumns = `repeat(${shipLength}, 1fr)`;

    for (let i = 0; i < shipLength; i++) {
      const block = document.createElement('div');
      block.dataset.index = i + 1;
      block.id = 'regular-block';
      block.classList.add('block');
      block.style.backgroundColor = colors[numToPlace];
      block.addEventListener('mouseover', event => {
        console.log(event.target.dataset.index);
        players[0].lastPieceIndex = event.target.dataset.index;
        console.log(`index: ${players[0].lastPieceIndex}`);
      });
      piece.appendChild(block);
    }

    return piece;
  };

  const twoLengthPiece = Piece(shipLength, players, boards[0].shipNumToPlace);

  const margins = ['83px', '60px', '38px', '16px'];

  switch (shipLength) {
    case 2:
      twoLengthPiece.style.marginLeft = margins[0];
      break;
    case 3:
      twoLengthPiece.style.marginLeft = margins[1];
      break;
    case 4:
      twoLengthPiece.style.marginLeft = margins[2];
      break;
    case 5:
      twoLengthPiece.style.marginLeft = margins[3];
      break;
  }

  twoLengthPiece.addEventListener('click', ev => {
    ev.target.parentNode.classList.toggle('vertical');
  });
  twoLengthPiece.addEventListener('dragstart', ev => {
    ev.dataTransfer.setData(
      'text',
      `${ev.target.classList.contains('vertical')}`
    );
  });

  piecesContainer.appendChild(twoLengthPiece);
};

const renderAIBoard = (boards, gameHasStarted) => {
  const gameBoardGrids = document.querySelectorAll('.gameboard-grid');
  const playerBoardGrid = gameBoardGrids[1];
  const playerBoard = boards[1];
  console.log(boards[1].missedAttackPositions);

  const colors = [
    '#badaf7',
    '#091476',
    '#5ea9ed',
    '#3090e8',
    '#1776cf',
    '#125ca1',
    '#0d4273',
    '#082745',
    '#1f6b93',
    '#1025d5'
  ];

  const getColor = (shipPositions, i) => {
    if (shipPositions.includes(i)) {
      if (shipPositions.indexOf(i) < 2) {
        return colors[0];
      } else if (shipPositions.indexOf(i) < 4) {
        return colors[1];
      } else if (shipPositions.indexOf(i) < 6) {
        return colors[2];
      } else if (shipPositions.indexOf(i) < 8) {
        return colors[3];
      } else if (shipPositions.indexOf(i) < 11) {
        return colors[4];
      } else if (shipPositions.indexOf(i) < 14) {
        return colors[5];
      } else if (shipPositions.indexOf(i) < 17) {
        return colors[6];
      } else if (shipPositions.indexOf(i) < 21) {
        return colors[7];
      } else if (shipPositions.indexOf(i) < 25) {
        return colors[8];
      } else if (shipPositions.indexOf(i) < 30) {
        return colors[9];
      }
    }
  };

  playerBoardGrid.innerHTML = '';
  const getHitArray = () => {
    let hitPositions = [];
    playerBoard.ships.forEach(ship => {
      ship.positions.forEach(positionItem => {
        if (positionItem.isHit) {
          hitPositions.push(positionItem.position);
        }
      });
    });
    return hitPositions;
  };

  const getShipArray = () => {
    let shipPositions = [];
    playerBoard.ships.forEach(ship => {
      ship.positions.forEach(positionItem => {
        shipPositions.push(positionItem.position);
      });
    });
    return shipPositions;
  };

  for (let i = 1; i <= 100; i++) {
    const hitPositions = getHitArray();
    const shipPositions = getShipArray();

    const div = document.createElement('div');
    div.dataset.pos = i;
    div.classList.add('grid-div-enemy');

    div.style.backgroundColor = getColor(shipPositions, i);

    if (i == 1 || i % 10 == 1) {
      div.style.borderLeftColor = 'grey';
    }

    if (i <= 10) {
      div.style.borderTopColor = 'grey';
    }

    if (boards[1].missedAttackPositions.includes(i.toString())) {
      div.textContent = '';
      const img = document.createElement('img');
      img.src = './img/miss.png';
      img.style.height = '35px';
      img.style.width = '35px';
      img.style.paddingTop = '7px';
      div.appendChild(img);
    } else if (hitPositions.includes(i)) {
      div.textContent = '';
      const img = document.createElement('img');
      img.src = './img/explosion.png';
      img.style.height = '45px';
      img.style.width = '45px';
      img.style.paddingTop = '1px';
      div.appendChild(img);
    } else if (gameHasStarted == true) {
      div.backgroundColor = 'white';
    }
    console.log(gameHasStarted);

    playerBoardGrid.appendChild(div);
    div.backgroundColor = 'white';
  }
};

module.exports = {
  renderAIBoard,
  renderGridDivs,
  renderPlayerBoardDivs,
  renderPiecesToPlace
};
