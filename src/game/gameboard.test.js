import Gameboard from './gameboard';

describe('Gameboard', () => {
  it('should be able to place ships at specific coordinates', () => {
    const gameboard = new Gameboard();

    gameboard.placeShip([0, 0], [0, 1], [0, 2]);

    expect(gameboard.ships).toMatchObject([
      {
        coordinates: [
          [0, 0],
          [0, 1],
          [0, 2],
        ],
      },
    ]);
  });

  it('should determine whether or not the attack hit a ship', () => {
    const gameboard = new Gameboard();

    gameboard.placeShip([2, 3], [2, 4], [2, 5], [2, 6], [2, 7]);

    expect(gameboard.receiveAttack(5, 5)).toBe(false);
    expect(gameboard.receiveAttack(2, 7)).toBe(true);
  });

  it('should keep track of missed attacks', () => {
    const gameboard = new Gameboard();

    gameboard.placeShip([2, 3], [2, 4], [2, 5], [2, 6], [2, 7]);

    gameboard.receiveAttack(3, 4);
    gameboard.receiveAttack(5, 2);
    gameboard.receiveAttack(2, 7);

    expect(gameboard.missedAttacks).toEqual(expect.arrayContaining([[3, 4]]));
    expect(gameboard.missedAttacks).toEqual(expect.arrayContaining([[5, 2]]));
    expect(gameboard.missedAttacks).toEqual(
      expect.arrayContaining([
        [5, 2],
        [3, 4],
      ]),
    );
    expect(gameboard.missedAttacks).toEqual(
      expect.not.arrayContaining([[2, 7]]),
    );
  });

  it('should report whether or not all ships have been sunk', () => {
    const gameboard = new Gameboard();

    const coordsShip1 = [
      [0, 0],
      [0, 1],
      [0, 2],
    ];
    const coordsShip2 = [
      [2, 3],
      [2, 4],
      [2, 5],
      [2, 6],
      [2, 7],
    ];

    gameboard.placeShip(...coordsShip1);
    gameboard.placeShip(...coordsShip2);

    [...coordsShip1, ...coordsShip2].forEach((coordinate) => {
      expect(gameboard.hasAllShipsSunk()).toBe(false);
      gameboard.receiveAttack(...coordinate);
    });
    expect(gameboard.hasAllShipsSunk()).toBe(true);
  });
});
