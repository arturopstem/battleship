import Ship from './ship';

describe("Ship's properties", () => {
  const ship = new Ship(5);

  it('should include length', () => {
    expect(ship).toHaveProperty('length');
  });

  it('should include hits', () => {
    expect(ship).toHaveProperty('hits');
  });

  it('should include sunk', () => {
    expect(ship).toHaveProperty('sunk');
  });
});

describe("Ship's hit method", () => {
  const ship = new Ship(5);

  it('should increase the number of hits', () => {
    const oldHits = ship.hits;
    ship.hit();
    expect(ship.hits).toBe(oldHits + 1);
  });
});

describe("Ship's isSunk method", () => {
  const ship = new Ship(5);

  it('should calculate whether a ship is considered sunk', () => {
    for (let i = 0; i < ship.length; i += 1) {
      expect(ship.isSunk()).toBe(false);
      ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
  });
});
