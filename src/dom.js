const renderGridDivs = boards => {
  const gameBoardGrids = document.querySelectorAll('.gameboard-grid');

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

      if (shipPositions.includes(i)) {
        div.style.backgroundColor = 'lightGrey';
      }

      if (playerBoard.missedAttackPositions.includes(i)) {
        div.textContent = 'miss';
      } else if (hitPositions.includes(i)) {
        div.textContent = 'hit';
      }

      playerBoardGrid.appendChild(div);
    }
  };

  renderPlayerBoard();
};

const markAsMissed = (boardGrid, pos) => {
  console.log(document.querySelector('#master-container'));
};

module.exports = { renderGridDivs, markAsMissed };
