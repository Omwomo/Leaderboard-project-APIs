import { getAllScores, saveScore } from './api.js';

let gameId = null;

const setGameId = (newGameId) => {
  gameId = newGameId;
};

const displayScores = (scores) => {
  const listElement = document.getElementById('lists');
  listElement.innerHTML = '';

  scores.forEach((scoreData) => {
    const listItem = document.createElement('li');
    listItem.className = 'list-item';
    listItem.textContent = `${scoreData.user}: ${scoreData.score}`;
    listElement.appendChild(listItem);
  });
};

const refreshScores = async () => {
  try {
    if (!gameId) {
      throw new Error('Game ID is not available.');
    }

    const scores = await getAllScores(gameId);
    displayScores(scores);
  } catch (error) {
    throw new Error('Error refreshing scores.');
  }
};

const submitScore = async (event) => {
  event.preventDefault();
  const nameInput = document.getElementById('name');
  const scoreInput = document.getElementById('score');
  const name = nameInput.value.trim();
  const score = parseInt(scoreInput.value, 10);

  if (!name || Number.isNaN(score)) {
    throw new Error('Invalid input!');
  }

  if (!gameId) {
    throw new Error('Game ID is not available.');
  }

  try {
    await saveScore(gameId, name, score);
    nameInput.value = '';
    scoreInput.value = '';
    await refreshScores();
  } catch (error) {
    throw new Error('Error saving the score.');
  }
};

export { setGameId, refreshScores, submitScore };
