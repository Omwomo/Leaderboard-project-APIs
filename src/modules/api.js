const API_BASE_URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';

const createNewGame = async (gameName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/games/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: gameName }),
    });

    const data = await response.json();
    return data.result; // Return the unique identifier for the game
  } catch (error) {
    throw new Error('Error creating the game.');
  }
};

const getAllScores = async (gameId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/games/${gameId}/scores/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data.result;
  } catch (error) {
    throw new Error('Error getting scores.');
  }
};

const saveScore = async (gameId, user, score) => {
  try {
    const response = await fetch(`${API_BASE_URL}/games/${gameId}/scores/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, score }),
    });

    const data = await response.json();
    return data.result;
  } catch (error) {
    throw new Error('Error saving score.');
  }
};

export { createNewGame, getAllScores, saveScore };
