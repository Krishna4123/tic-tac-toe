document.addEventListener("DOMContentLoaded", function () {
    const cells = document.querySelectorAll(".cell");
    const statusText = document.getElementById("statusText");
    const restartButton = document.getElementById("restartButton");
  
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
  
    function checkWinner() {
      const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (
          gameBoard[a] &&
          gameBoard[a] === gameBoard[b] &&
          gameBoard[a] === gameBoard[c]
        ) {
          return gameBoard[a];
        }
      }
  
      return null;
    }
  
    function checkDraw() {
      return gameBoard.every((cell) => cell !== "");
    }
  
    function handleClick(event) {
      const cellIndex = event.target.getAttribute("cellindex");
  
      if (gameBoard[cellIndex] === "" && !checkWinner()) {
        gameBoard[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;
  
        const winner = checkWinner();
        if (winner) {
          statusText.textContent = `${winner} wins!`;
        } else if (checkDraw()) {
          statusText.textContent = "It's a draw!";
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
          statusText.textContent = `Current Player: ${currentPlayer}`;
        }
      }
    }
  
    function restartGame() {
      gameBoard = ["", "", "", "", "", "", "", "", ""];
      cells.forEach((cell) => (cell.textContent = ""));
      statusText.textContent = "Current Player: X";
      currentPlayer = "X";
    }
  
    cells.forEach((cell) => cell.addEventListener("click", handleClick));
    restartButton.addEventListener("click", restartGame);
  });
  