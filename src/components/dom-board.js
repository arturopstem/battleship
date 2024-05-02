function createLabels(direction) {
  const labelsContainer = document.createElement('div');
  labelsContainer.classList.add('table-labels');
  labelsContainer.classList.add(`${direction}-labels`);

  if (direction === 'row') {
    for (let i = 0; i < 10; i += 1) {
      const rowLabel = document.createElement('div');
      rowLabel.innerText = i + 1;
      labelsContainer.appendChild(rowLabel);
    }
  } else if (direction === 'column') {
    const charCode = 'A'.charCodeAt();
    for (let i = 0; i < 10; i += 1) {
      const columnLabel = document.createElement('div');
      columnLabel.innerText = String.fromCharCode(charCode + i);
      labelsContainer.appendChild(columnLabel);
    }
  }

  return labelsContainer;
}

function createTable() {
  const squaresContainer = document.createElement('div');
  squaresContainer.classList.add('table');

  for (let row = 0; row < 10; row += 1) {
    for (let col = 0; col < 10; col += 1) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.dataset.row = row;
      square.dataset.col = col;
      squaresContainer.appendChild(square);
    }
  }

  return squaresContainer;
}

function createBoardElements() {
  const rowLabels = createLabels('row');
  const columnLabels = createLabels('column');
  const table = createTable();

  return [rowLabels, columnLabels, table];
}
export default createBoardElements;
