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

