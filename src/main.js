import * as dom from './dom';
import * as coords from './game/coordinates';
import { isPieceAvailable, newSetOfShipPieces } from './game/pieces';
import Player from './game/player';
import './index.css';

dom.registerComponents();

dom.init();

const computerPieces = newSetOfShipPieces();
const computer = new Player('computer');

Object.keys(computerPieces).forEach((piece) => {
  while (isPieceAvailable(piece, computerPieces)) {
    const allShipsCoords = coords.allShipsCoords(computer.gameboard.ships);

    let shipCoords = coords.randomShipCoords(piece);
    while (coords.hasOverlap(shipCoords, allShipsCoords)) {
      shipCoords = coords.randomShipCoords(piece);
    }

    computer.gameboard.placeShip(...shipCoords);
    computerPieces[piece] -= 1;
  }
});

const realPlayerPieces = newSetOfShipPieces();
const realPlayer = new Player('real');

dom.activateForm(realPlayer, realPlayerPieces);
dom.activateTrackingBoard(realPlayer, computer);
