// script.js
document.addEventListener('DOMContentLoaded', function() {
    const currentPlayerElement = document.getElementById('currentPlayer');
    let currentPlayer = 'X'; // Start with 'X'
    let gameEnded = false;
    let counterX = 0;
    let counterO = 0;
    const alertDiv = document.getElementsByClassName('alert')[0];
    const restartButton = document.getElementById('restartButton');
    const scoreX = document.getElementsByClassName("scoreX")[0];
    const scoreO = document.getElementsByClassName("scoreO")[0];
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
            alertDiv.textContent ="";
            // Check if the game has ended or the button is already occupied
            if (!gameEnded && button.textContent === "") {
                // Change button content to current player ('X' or 'O')
                button.textContent = currentPlayer;

                // Color the button based on the player
                button.style.color = currentPlayer === 'X' ? 'red' : 'blue';
                button.style.fontWeight = "bold"; 
                button.style.transition = "all 0.5s ease-in-out";
                button.style.fontSize = "40pt"


                // Check for a winner
                if (checkWinner(currentPlayer)) {
                    alertDiv.textContent=(`The game has ended. Player ${currentPlayer} wins!`);
                    if (currentPlayer === 'X') {
                        counterX++;
                        scoreX.textContent = counterX;
                    } else {
                        counterO++;
                        scoreO.textContent = counterO;
                    }
                    gameEnded = true;
                    return; // Exit the function
                }

                // Toggle player turn
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

                // Update current player element
                currentPlayerElement.textContent = currentPlayer;
                currentPlayerElement.style.color = currentPlayer === 'X' ? 'red' : 'blue';
            } else if (gameEnded) {
                alertDiv.textContent="The game has ended. Press the 'Restart Game' button to play again.";
            } else {
                alertDiv.textContent="This position is already occupied. Please choose another position.";
                roundCounter--;
            }
            roundCounter++;
            if (roundCounter == 9 && gameEnded == false){
                gameEnded = true;
                alertDiv.textContent=("The game is a DRAW!");
            }
            restartButton.addEventListener('click', () => {
                roundCounter = 0;
                gameEnded = false;
                currentPlayer = 'X';
                alertDiv.textContent ="";
                currentPlayerElement.textContent = currentPlayer;
                currentPlayerElement.style.color ='';
                buttons.forEach(button => {
                    button.textContent = "";
                    button.style.color = ''; // Reset the color
                })

            });
        });
    });

    // Function to check for a winner
    function checkWinner(player) {
        return winningCombinations.some(combination => {
            return combination.every(index => buttons[index].textContent === player);
        });
    }
    });

