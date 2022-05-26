const { Pool } = require('pg');

const pgConfig = require('./pgConfig');
const pool = new Pool(pgConfig);

module.exports = {

  addSingleCard: (cardData) => {
    const query = `
      INSERT INTO card_data
      (id, user_email, prompt, ai_response, time_stamp, engine_model)
      VALUES ($1, $2, $3, $4, $5, $6);
    `;

    const inputs = [
      cardData.id,
      cardData.userEmail,
      cardData.prompt,
      cardData.aiResponse,
      cardData.timeStamp,
      cardData.engineModel
    ];

    return pool.query(query, inputs)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  },

  getAllFiltered: () => {
    const query = `
      SELECT * FROM card_data, users ORDER BY card_data.time_stamp DESC;
    `;

    return pool.query(query)
      .then((response) => {
        return response.rows
      })
      .catch((err) => {
        return err;
      });
  }

};

// Add a single card to the database