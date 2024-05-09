function newSetOfShipPieces() {
  return { 5: 1, 4: 1, 3: 2, 2: 1 };
}

function isPieceAvailable(pieceLength, pieces) {
  return Boolean(pieces[pieceLength]);
}

function hasPiecesLeft(pieces) {
  return Object.keys(pieces).some((piece) => pieces[piece] !== 0);
}

export { newSetOfShipPieces, isPieceAvailable, hasPiecesLeft };
