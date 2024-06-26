// Get board and print board
function GameBoard() {
  const row = 3;
  const column = 3;
  const board = [];

  // Create 2d board
  for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < column; j++) {
      board[i].push(Cell());
    }
  }

  // Get board
  const getBoard = () => board;

  return { getBoard };
}

// Assign value to cell and change value with player variable
function Cell() {
  let value = 0;

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    addToken,
    getValue,
  };
}

/*
Control flow of the game:
-add players
-game turns
-winning conditions
*/

function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
  const board = GameBoard();

  const players = [
    {
      name: playerOneName,
      token: 1,
    },
    {
      name: playerTwoName,
      token: 2,
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

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
      [[0, 2], [1, 1], [2, 0]],
    ];

    let isBoardFull = true;

    for (const pattern of winningPatterns) {
      const [firstRow, firstCol] = pattern[0];
      const symbol = board[firstRow][firstCol].getValue(); // Get the value of the first cell

      if (symbol === 0) {
        isBoardFull = false; // Board is not full if there's an empty cell
        continue; // Skip if first cell is empty
      }

      const isWinningPattern = pattern.every(([row, col]) => board[row][col].getValue() === symbol);

      if (isWinningPattern) {
        // Return the string indicating the winner
        return symbol === 1 ? "Player 1 wins!" : "Player 2 wins!";
      }
    }

    if (isBoardFull) {
      return "Tie!";
    }

    // If no winning pattern and the board isn't full
    return null;
  };

  const playerMove = (row, column) => {
    if (board.getBoard()[row][column].getValue() !== 0) {
      return false; // Move is not valid
    } else {
      // Move is valid
      board.getBoard()[row][column].addToken(getActivePlayer().token);
      return true;
    }
  };

  const playRound = (textDiv) => {
    const result = checkForWin(board.getBoard());

    if (result) {
      textDiv.textContent = result;
    } else {
      switchPlayerTurn();
      textDiv.textContent = `${getActivePlayer().name}'s turn...`;
    }
  };

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
    playerMove,
    switchPlayerTurn
  };
}

(function ScreenController() {
  const game = GameController();
  const textDiv = document.querySelector(".text");
  const buttons = document.querySelectorAll(".cell");
  let activePlayer = game.getActivePlayer();

  // Add event listener to each cell
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const row = Math.floor(index / 3);
      const column = index % 3;
      const isValidMove = game.playerMove(row, column);
      if (isValidMove) {
        game.playRound(textDiv);
        updateScreen();
      }
    });
  });

  

  const updateScreen = () => {
    // Newest version of board and player turn
    const board = game.getBoard();
    activePlayer = game.getActivePlayer();

    // Update board
    board.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const button = buttons[rowIndex * 3 + columnIndex];
        button.textContent = cell.getValue() === 1 ? "X" : cell.getValue() === 2 ? "O" : "";
      });
    });
  };


  // Initialize screen
  updateScreen();
  textDiv.textContent = `${activePlayer.name}'s turn...`;


  // Restart button
  const restartButton = document.getElementById("restart-btn");
  restartButton.addEventListener("click", () => {
    game.getBoard().forEach((row) => row.forEach((cell) => cell.addToken(0)));
    updateScreen();
    // Restart always to player one
    if (activePlayer.name !== "Player One") {
      game.switchPlayerTurn();
    }
    textDiv.textContent = `${activePlayer.name}'s turn...`;
  });
})();
