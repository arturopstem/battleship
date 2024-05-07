import { areEqual, getShipCoordsList, hasOverlap, parse } from './coordinates';

describe('parse', () => {
  it('should work on valid coordinates', () => {
    expect(parse('A1')).toEqual([0, 0]);
    expect(parse('J10')).toEqual([9, 9]);
  });

  it('should accept lowercase letter coordinate', () => {
    expect(parse('a1')).toEqual([0, 0]);
    expect(parse('j10')).toEqual([9, 9]);
  });

  it('should return null on invalid coordinates', () => {
    expect(parse('a0')).toBeNull();
    expect(parse('a11')).toBeNull();
    expect(parse('0,0')).toBeNull();
  });
});

describe('areEqual', () => {
  it('should return true on equality', () => {
    expect(areEqual([0, 0], [0, 0])).toBe(true);
    expect(areEqual([9, 9], [9, 9])).toBe(true);
  });
  it('should return false on inequality', () => {
    expect(areEqual([0, 0], [0, 1])).toBe(false);
    expect(areEqual([1, 0], [0, 0])).toBe(false);
    expect(areEqual([9, 8], [9, 9])).toBe(false);
    expect(areEqual([8, 9], [9, 9])).toBe(false);
  });
});

describe('hasOverlap', () => {
  it('should return true if at least a coordinate overlaps', () => {
    expect(
      hasOverlap(
        [
          [0, 0],
          [1, 0],
        ],
        [
          [1, 0],
          [1, 1],
          [1, 2],
        ],
      ),
    ).toBe(true);
  });
  it('should return false if no coordinate overlaps', () => {
    expect(
      hasOverlap(
        [
          [0, 0],
          [1, 0],
        ],
        [
          [0, 1],
          [0, 2],
          [0, 3],
        ],
      ),
    ).toBe(false);
  });

  describe('getShipCoordsList', () => {
    it('should return list of one coord if both coords are the same', () => {
      expect(getShipCoordsList([0, 0], [0, 0])).toEqual([[0, 0]]);
    });

    it('should return empty array if trying to get a diagonal list', () => {
      expect(getShipCoordsList([0, 0], [9, 9])).toEqual([]);
    });

    it('should return an array of coords on valid coords input', () => {
      expect(getShipCoordsList([0, 0], [0, 4])).toEqual([
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
      ]);
    });
  });
});
