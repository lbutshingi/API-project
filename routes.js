const express = require('express');
const pool = require('./db');
const { getWeatherData } = require('./weatherService');

const router = express.Router();

// Fetch weather data from public API and store it in the database
router.get('/weather/:city', async (req, res) => {
  const city = req.params.city;
  try {
    const weatherData = await getWeatherData(city);
    const query = 'INSERT INTO weather (city, data) VALUES ($1, $2) RETURNING *';
    const values = [city, weatherData];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create, Read, Update, Delete (CRUD) routes for local data
router.post('/data', async (req, res) => {
  const { name, value } = req.body;
  try {
    const query = 'INSERT INTO data (name, value) VALUES ($1, $2) RETURNING *';
    const values = [name, value];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM data');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/data/:id', async (req, res) => {
  const id = req.params.id;
  const { name, value } = req.body;
  try {
    const query = 'UPDATE data SET name = $1, value = $2 WHERE id = $3 RETURNING *';
    const values = [name, value, id];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/data/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM data WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;