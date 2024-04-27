import Ship from './ship';

class Gameboard {
  constructor() {
    this.ships = [];
    this.missedAttacks = [];
  }

  placeShip(...coordinates) {
    const { length } = coordinates;
    const ship = new Ship(length);

    this.ships.push({ ship, coordinates });
  }

  receiveAttack(row, col) {
    const attackCoord = [row, col];

    const shipHit = this.ships.find(({ coordinates }) =>
      coordinates.some(([x, y]) => x === row && y === col),
    );

    if (shipHit) {
      shipHit.ship.hit();

      return true;
    }

    this.missedAttacks.push(attackCoord);

    return false;
  }

  hasAllShipsSunk() {
    return this.ships.every(({ ship }) => ship.isSunk());
  }
}

export default Gameboard;
