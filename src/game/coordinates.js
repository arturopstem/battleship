function parse(coord) {
  const REGEX = /^(?<colStr>[a-jA-J])(?<rowStr>10|[1-9])$/;
  const match = coord.trim().match(REGEX);

  if (!match) return null;

  const { rowStr, colStr } = match.groups;
  const row = Number(rowStr) - 1;
  const col = colStr.toUpperCase().charCodeAt() - 'A'.charCodeAt();

  return [row, col];
}

function areEqual(coordA, coordB) {
  return coordA.every((elem, i) => elem === coordB[i]);
}

function hasOverlap(shipCoords, existingShipsCoords) {
  const overlap = shipCoords.some((shipCoord) =>
    existingShipsCoords.some((coord) => areEqual(coord, shipCoord)),
  );

  return overlap;
}

function getShipCoordsList(coordA, coordB) {
  const start = { row: coordA[0], col: coordA[1] };
  const end = { row: coordB[0], col: coordB[1] };
  const rowDiff = end.row - start.row;
  const colDiff = end.col - start.col;
  const coordsList = [];

  if (rowDiff === 0 && colDiff === 0) {
    coordsList.push([start.row, start.col]);
    return coordsList;
  }

  if (rowDiff * colDiff !== 0) {
    return coordsList;
  }

  if (rowDiff < 0) {
    [start.row, end.row] = [end.row, start.row];
  }
  if (colDiff < 0) {
    [start.col, end.col] = [end.col, start.col];
  }

  for (let r = start.row; r <= end.row; r += 1) {
    for (let c = start.col; c <= end.col; c += 1) {
      coordsList.push([r, c]);
    }
  }

  return coordsList;
}

function randomShipCoords(length) {
  if (length < 2 || length > 5) {
    return null;
  }

  const randomInt = (n = 10) => Math.floor(Math.random() * n);

  const DIFF = length - 1;
  const start = { row: randomInt(), col: randomInt() };
  const end = { row: start.row + DIFF, col: start.col + DIFF };

  while (end.row > 9 && end.col > 9) {
    [start.row, start.col] = [randomInt(), randomInt()];
    [end.row, end.col] = [start.row + DIFF, start.col + DIFF];
  }

  if (end.row < 10 && end.col < 10) {
    const commonAxis = Object.keys(end)[randomInt(2)];
    end[commonAxis] = start[commonAxis];
  } else if (end.row < 10) {
    end.col = start.col;
  } else if (end.col < 10) {
    end.row = start.row;
  }

  const coordsList = [];
  for (let r = start.row; r <= end.row; r += 1) {
    for (let c = start.col; c <= end.col; c += 1) {
      coordsList.push([r, c]);
    }
  }

  return coordsList;
}

export { areEqual, getShipCoordsList, hasOverlap, parse, randomShipCoords };
