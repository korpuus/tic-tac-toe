
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

  const playerMove = (player) => {
    const playerChoiceCoordinates = playerChoice();

    if (!playerChoiceCoordinates) return;

    // Destructuring playerChoice for row and column values
    const [row, column] = playerChoiceCoordinates;

    // Move valid if cell is empty (later add if not value of other player)
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
function Cell () {
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

/*
Control flow of the game:
-add players
-game turns
-winning conditions
*/

function GameController (
  playerOneName = 'Player One',
  playerTwoName = 'Player Two'
) {
  const board = GameBoard();

  const players = [
    {
      name: playerOneName,
      token: 1
    },
    {
      name: playerTwoName,
      token: 2
    }
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = (activePlayer === players[0])
    ? players[1]
    : players[0]
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  // Play round with activePlayer() and logic for handling wins

  const playRound = () => {
    // Get active player
    const currentPlayer = getActivePlayer();

    // Print current state of board
    printNewRound();

    // Active player makes move
    playerMove(currentPlayer);

    // Switch players
    switchPlayerTurn();
  };
};
