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
