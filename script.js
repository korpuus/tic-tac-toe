function GameBoard () {
  const rows = 3;
  const columns = 3;
  const board = [];

 return function makeBoard() { 
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push('X');
      }
    }
    return console.log(board);
  }
}

const gameBoard = GameBoard();

console.log(gameBoard());

