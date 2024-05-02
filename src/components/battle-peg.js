class BattlePeg extends HTMLElement {
  constructor(color, row, col) {
    super();
    this.style.setProperty('--peg-color', color);
    this.style.setProperty('--peg-row', row + 1);
    this.style.setProperty('--peg-column', col + 1);
  }

  connectedCallback() {
    this.classList.add('fade-in');
  }
}

export default BattlePeg;
