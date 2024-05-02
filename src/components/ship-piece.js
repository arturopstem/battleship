class ShipPiece extends HTMLElement {
  constructor(start, end) {
    super();
    const [rowStart, colStart] = start;
    const [rowEnd, colEnd] = end;
    this.style.setProperty('--row-start', rowStart + 1);
    this.style.setProperty('--row-end', rowEnd + 2);
    this.style.setProperty('--column-start', colStart + 1);
    this.style.setProperty('--column-end', colEnd + 2);
  }

  connectedCallback() {
    this.classList.add('fade-in');
  }
}

export default ShipPiece;
