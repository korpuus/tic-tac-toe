
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
  const rowPick = prompt('Enter row number from 1 to 3: ');
  const columnPick = prompt('Enter column number from 1 to 3: ');

  const rowNumber = parseInt(rowPick);
  const columnNumber = parseInt(columnPick);

  if (rowNumber > 0 && rowNumber < 3 && columnNumber > 0 && columnNumber < 3) {
    const selectedPlace = board[rowPick][columnPick];
    console.log(`Selected place is ${selectedPlace}`);
    return selectedPlace;
  } else {
    console.log(`Invalid entry`);
  }
}
playerMove();

const makeMove = (playerMove, board) => {
  

  }

}
GameBoard();
