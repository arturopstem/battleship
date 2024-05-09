import BattlePeg from './components/battle-peg';
import FormCoords from './components/form-coords';
import PlacementBoard from './components/placement-board';
import ShipPiece from './components/ship-piece';
import TrackingBoard from './components/tracking-board';
import * as coords from './game/coordinates';
import { hasPiecesLeft, isPieceAvailable } from './game/pieces';

function registerComponents() {
  customElements.define('battle-peg', BattlePeg);
  customElements.define('form-coords', FormCoords, { extends: 'form' });
  customElements.define('placement-board', PlacementBoard);
  customElements.define('ship-piece', ShipPiece);
  customElements.define('tracking-board', TrackingBoard);
}

function init() {
  const boards = document.querySelector('.boards');
  boards.replaceChildren();

  const trackingBoard = new TrackingBoard();
  boards.appendChild(trackingBoard);

  const placementBoard = new PlacementBoard();
  boards.appendChild(placementBoard);

  const formCoords = new FormCoords();
  boards.appendChild(formCoords);
}

function activateForm(realPlayer, realPlayerPieces) {
  const form = document.querySelector('.form-coords');
  form.elements.start.focus();
  const placementBoard = document.querySelector('placement-board');
  const trackingBoard = document.querySelector('tracking-board');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const pieces = realPlayerPieces;
    if (hasPiecesLeft(pieces)) {
      const inputs = form.elements;
      const start = coords.parse(inputs.start.value);
      const end = coords.parse(inputs.end.value);
      const shipCoords = coords.getShipCoordsList(start, end);
      const shipLength = shipCoords.length;
      const allShipsCoords = coords.allShipsCoords(realPlayer.gameboard.ships);

      if (
        isPieceAvailable(shipLength, pieces) &&
        !coords.hasOverlap(shipCoords, allShipsCoords)
      ) {
        realPlayer.gameboard.placeShip(...shipCoords);
        placementBoard.displayShip(shipCoords.at(0), shipCoords.at(-1));
        pieces[shipLength] -= 1;
        form.reset();
        form.elements.start.focus();
      }

      if (!hasPiecesLeft(pieces)) {
        form.remove();
        trackingBoard.classList.remove('hidden');
      }
    }
  });
}

function activateTrackingBoard(realPlayer, computer) {
  const trackingBoard = document.querySelector('tracking-board');
  const placementBoard = document.querySelector('placement-board');
  const attacksDoneByComputer = [];

  trackingBoard.addEventListener('click', (e) => {
    if (e.target.classList.contains('square')) {
      const square = e.target;
      const row = Number(square.dataset.row);
      const col = Number(square.dataset.col);
      const computerBoard = computer.gameboard;
      const hitComputer = computerBoard.receiveAttack(row, col);
      trackingBoard.displayPeg(hitComputer ? 'red' : 'white', row, col);
      if (computerBoard.hasAllShipsSunk()) {
        console.log('HUMAN WINS');
        return;
      }

      let attackCoord = coords.randomAttackCoords();
      while (coords.existsOn(attackCoord, attacksDoneByComputer)) {
        attackCoord = coords.randomAttackCoords();
      }
      attacksDoneByComputer.push(attackCoord);
      const realBoard = realPlayer.gameboard;
      const hitReal = realBoard.receiveAttack(...attackCoord);
      placementBoard.displayPeg(hitReal ? 'red' : 'white', ...attackCoord);
      if (realBoard.hasAllShipsSunk()) {
        console.log('COMPUTER WINS');
      }
    }
  });
}

export { activateForm, activateTrackingBoard, registerComponents, init };
