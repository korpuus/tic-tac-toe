function GameBoard () {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let r = 0; r < rows; r++) {
    console.log('#');
    for (let c = 0; r < columns; c++) {
      console.log('#')
    }
  }
}

GameBoard();