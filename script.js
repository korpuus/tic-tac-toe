
function GameBoard () {
  const row = 3;
  const column = 3;
  const board = [];

  //create 2d board
  for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < column; j++) {
      board[i].push(0);
    }
  }
 

const playerMove = () => {
  const row = prompt('Enter row and row number from 1 to 3: ');
  const column = prompt('Enter column number from 1 to 3: ');

  if (row > 0 && row < row.length && column > 0 && column < column.length) {
    const selectedPlace = board[row][column];
    console.log(`Selected place is ${selectedPlace}`);
    return selectedPlace;
  } else {
    console.log(`Invalid entry`);
  }
}

const makeMove = () => {
  

  }

}
GameBoard();
