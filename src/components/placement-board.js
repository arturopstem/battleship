import BattlePeg from './battle-peg';
import createBoardElements from './dom-board';
import ShipPiece from './ship-piece';

class PlacementBoard extends HTMLElement {
  constructor() {
    super();
    this.classList.add('board');
    const boardElements = createBoardElements();
    this.replaceChildren(...boardElements);
  }

  displayPeg(color, row, col) {
    const peg = new BattlePeg(color, row, col);
    const table = this.querySelector('.table');
    table.appendChild(peg);
  }

  displayShip(start, end) {
    const ship = new ShipPiece(start, end);
    const table = this.querySelector('.table');
    table.appendChild(ship);
  }
}

export default PlacementBoard;
