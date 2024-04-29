
function GameBoard () {
  const row = 3;
  const column = 3;
  const board = [];

  //create 2d board
  for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < column; j++) {
      board[i].push(Cell());
    }
  }
 
const getBoard = () => board;

const playerChoice = () => {
  const rowPick = parseInt(prompt('Enter row number from 1 to 3: ')) - 1;
  const columnPick = parseInt(prompt('Enter column number from 1 to 3: ')) - 1;

  if (rowPick >= 0 && rowPick < row && columnPick >= 0 && columnPick < column) {
    return [rowPick, columnPick];
  } else {
    console.log(`Invalid entry`);
    return null;
  }
}
/* I need to (filter, loop, map...?) through board with player cell choice to check if it's valid move 
  valid if (equal to 0 [later to player value {1 or 2} that is taking turn -> after i add 2 players]), 
  then use addToken() to add player move in that cell*/

  const playerMove = (player) => {
    const playerChoiceCoordinates = playerChoice();

    if (!playerChoiceCoordinates) return;

    // Destructuring playerChoice for row and column values
    const [row, column] = playerChoiceCoordinates;

    board[row][column].getValue() === 0
      ? board[row][column].addToken(player)
      : console.log('Invalid move') 
  }

  // Prints board with cell values
  const printBoard = () => {
    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
    console.log(boardWithCellValues);
  };

  return {getBoard, playerMove, printBoard};

}

// assign value to cell and change value with player variable
function Cell (player) {
  let value = 0;

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    addToken,
    getValue
  };
}

