
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

  // Check for win function

  const checkForWin = (board) => {
    const winningPatterns = [
      // Rows
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      // Columns
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // Diagonals
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]]
    ];
  
    let isBoardFull = true;
  
    for (const pattern of winningPatterns) {
      const [firstRow, firstCol] = pattern[0];
      const symbol = board[firstRow][firstCol]; // Get the value of the first cell
  
      if (symbol === 0) {
        isBoardFull = false; // Board is not full if there's an empty cell
        continue; // Skip if first cell is empty
      }
  
      const isWinningPattern = pattern.every(([row, col]) => board[row][col] === symbol);
  
      if (isWinningPattern) {
        // Return the string indicating the winner
        return symbol === 1 
          ? 'Player 1 wins!' 
          : 'Player 2 wins!';
      }
    }
  
    if (isBoardFull) {
      return 'Tie!';
    }
  
    // If no winning pattern is found and the board is not full, return a string indicating no winner yet
    return null;
  };

  // Play round with activePlayer() and logic for handling wins

  const playRound = () => {
    // Get active player
    const currentPlayer = getActivePlayer();

    // Print current state of board
    printNewRound();

    // Active player makes move
    playerMove(currentPlayer);

    // Check for win
    checkForWin();

    // Switch players
    switchPlayerTurn();
  };

  return {
    playRound,
    getActivePlayer
  };
};

function ScreenController () {
  const game = GameController();
  const textDiv = document.querySelector('.text');
  const boardDiv = document.querySelector('.board');


  const updateScreen = () => {
    // Clear board
    boardDiv.textContent = '';

    // Newest version of board and player turn
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    // Display player's turn
    textDiv.textContent = `${activePlayer.name}'s turn...`;

    // Grab board and assign values to cells
    const buttons = document.querySelectorAll('.cell');
    
    for(let i = 0; i < board.length; i++) {
      for(let j = 0; j < board[i].length; j++) {
        buttons[i * board.length + j].textContent = board[i][j];
      }
    }
    
  }
};