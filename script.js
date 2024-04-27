
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
 

const playerChoice = () => {
  // ask user to pick cell on board
  const rowPick = prompt('Enter row number from 1 to 3: ');
  const columnPick = prompt('Enter column number from 1 to 3: ');

  const rowNumber = parseInt(rowPick);
  const columnNumber = parseInt(columnPick);

  if (rowNumber > 0 && rowNumber < row && columnNumber > 0 && columnNumber < column) {
    const selectedPlace = board[rowPick][columnPick];
    console.log(`Selected place is ${selectedPlace}`);
    return selectedPlace;
  } else {
    console.log(`Invalid entry`);
  }

  /* I need to (filter, loop, map...?) through board with player cell choice to check if it's valid move 
  valid if (equal to 0 [later to player value {1 or 2} that is taking turn -> after i add 2 players]), 
  then use addToken() to add player move in that cell*/
}
playerChoice();

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
