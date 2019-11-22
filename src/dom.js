const renderGridDivs = (boards, clickPosHandler) => {
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

      if (shipPositions.includes(i)) {
        div.setAttribute('draggable', true);
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
      }

      playerBoardGrid.appendChild(div);
    }
  };

  const renderAIBoard = () => {
    const playerBoardGrid = gameBoardGrids[1],
      playerBoard = boards[1];

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

    friendlySunkenShipsDisplay.textContent = `friendly ships sunk: ${boards[0].getSunkenShipNumber()}`;
    enemySunkenShipsDisplay.textContent = `enemy ships sunk: ${boards[1].getSunkenShipNumber()}`;
  };

  setSunkenShipCounts();
  renderPlayerBoard();
  renderAIBoard();
};

module.exports = { renderGridDivs };
