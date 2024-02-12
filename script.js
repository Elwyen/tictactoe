// script.js
document.addEventListener('DOMContentLoaded', function() {
  const currentPlayerElement = document.getElementById('currentPlayer');
  let currentPlayer = 'X'; // Start with 'X'
  let gameEnded = false;

  // Winning combinations
  const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  // Get all buttons
  const buttons = document.querySelectorAll('.button');

  let roundCounter = 0;
  // Add click event listener to each button
  buttons.forEach(button => {
      button.addEventListener('click', () => {
          // Check if the game has ended or the button is already occupied
          if (!gameEnded && button.textContent === "") {
              // Change button content to current player ('X' or 'O')
              button.textContent = currentPlayer;

              // Check for a winner
              if (checkWinner(currentPlayer)) {
                  alert(`Player ${currentPlayer} wins!`);
                  gameEnded = true;
                  return; // Exit the function
              }

              // Toggle player turn
              currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

              // Update current player element
              currentPlayerElement.textContent = currentPlayer;
          } else if (gameEnded) {
              alert("The game has ended. Please refresh the page to start a new game.");
          } else {
              alert("This position is already occupied. Please choose another position.");
          }
          roundCounter++;
          if (roundCounter == 9){
            gameEnded = true;
            alert("The game is a DRAW!");
          }
      });
  });

  // Function to check for a winner
  function checkWinner(player) {
      return winningCombinations.some(combination => {
          return combination.every(index => buttons[index].textContent === player);
      });
  }
});
