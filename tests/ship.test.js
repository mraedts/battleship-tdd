const main = require('../main');
const ship = main.shipOne;

it('sets positions correctly', () => {
  ship.setPositions([1, 2, 3, 4]);

  expect(ship.positions).toEqual([
    { position: 1, isHit: false },
    { position: 2, isHit: false },
    { position: 3, isHit: false },
    { position: 4, isHit: false }
  ]);
});

it('marks ship position as hit correctly', () => {
  ship.hit(3);
  expect(ship.positions).toEqual([
    { position: 1, isHit: false },
    { position: 2, isHit: false },
    { position: 3, isHit: true },
    { position: 4, isHit: false }
  ]);
});

it('sinks ship if all positions have been hit', () => {
  ship.hit(1);
  ship.hit(2);
  ship.hit(4);
  expect(ship.isSunk()).toBe(true);
});
