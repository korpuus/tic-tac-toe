//step 1. Display board
function GameBoard () {
  const rows = 3;
  const columns = 3;
  const board = [];

  return function MakeBoard() { 
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(Cell());
      }
    }
    return board;
  }
}

const gameBoard = GameBoard();

console.log(gameBoard()); //testing

//step 2. Take player input and change board cell
function Cell() {
  let value = 0;

  const addFigure = (player) => {
    value = player;
  }

  const getValue = () => value;

  return {
    addFigure,
    getValue
  }
}

//step 3. Check with .map if cell is empty
