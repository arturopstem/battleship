import BattlePeg from './battle-peg';
import createBoardElements from './dom-board';

class TrackingBoard extends HTMLElement {
  constructor() {
    super();
    this.classList.add('board');
    this.classList.add('hidden');
    const boardElements = createBoardElements();
    this.replaceChildren(...boardElements);
  }

  displayPeg(color, row, col) {
    const peg = new BattlePeg(color, row, col);
    const table = this.querySelector('.table');
    table.appendChild(peg);
  }
}

export default TrackingBoard;
