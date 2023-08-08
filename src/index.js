import './index.css';
import { setGameId, refreshScores } from './modules/leaderboard.js';
import { createNewGame, saveScore } from './modules/api.js';

const newGameName = "Eugene's Game";
let gameId = 'Tt8YMhjOTtlsLrI74gKS'; // Variable to store the game ID

function displayMessage(message) {
  const messageElement = document.getElementById('message');
  messageElement.textContent = message;
}

function displayErrorMessage(errorMessage) {
  const messageElement = document.getElementById('message');
  messageElement.textContent = errorMessage;
  messageElement.style.color = 'red';
}

const initializeGame = async () => {
  try {
    // Check if gameId is already available
    if (!gameId) {
      // Create a new game and save the gameId
      gameId = await createNewGame(newGameName);
      displayMessage(`Game ID "${gameId}" set.`);
    }

    // Set the gameId in leaderboard.js
    setGameId(gameId);

    // Refresh scores on page load
    // await refreshScores();
  } catch (error) {
    displayErrorMessage('Error initializing the game:', error.message);
  }
};

// Refresh scores.
document.getElementById('refresh').addEventListener('click', await refreshScores);
// Call the function to initialize the game
initializeGame();

// Event listener for "Submit" button
document.getElementById('submit').addEventListener('click', async (event) => {
  event.preventDefault();
  try {
    // Get input values
    const nameInput = document.getElementById('name');
    const scoreInput = document.getElementById('score');
    const name = nameInput.value.trim();
    const score = parseInt(scoreInput.value, 10);

    if (!name || Number.isNaN(score)) {
      throw new Error('Invalid input!');
    }

    // Save the score
    await saveScore(gameId, name, score);

    // Clear input fields and refresh scores
    nameInput.value = '';
    scoreInput.value = '';
    await refreshScores();
  } catch (error) {
    displayErrorMessage(error.message);
  }
});

// Toggle between light and dark theme.

const themeToggle = document.getElementById('theme-toggle');
const { body } = document;

themeToggle.addEventListener('click', () => {
  if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
  }
});

export { displayMessage, displayErrorMessage };
