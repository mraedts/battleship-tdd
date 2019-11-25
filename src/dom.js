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

    playerBoardGrid.appendChild(div);
  }
};

const renderPiecesToPlace = (players, boards) => {
  const shipLength = boards[0].shipLengths[boards[0].shipNumToPlace];

  const piecesContainer = document.querySelector('#pieces-container');
  piecesContainer.innerHTML = '';

  const Piece = (shipLength, players, numToPlace) => {
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

    // div.style.backgroundColor = getColor(shipPositions, i);

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
  renderPlayerBoardDivs,
  renderPiecesToPlace
};
