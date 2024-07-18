const express = require('express');
const pool = require('./db');
const { getWeatherData } = require('./weatherService');

const router = express.Router();
/**
 * @swagger
 * /api/weather/{city}:
 *   get:
 *     summary: Get weather data for a city
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         description: City name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Weather data retrieved successfully
 *       400:
 *         description: City is required
 *       500:
 *         description: Error fetching weather data
 */

router.get('/weather/:city', async (req, res) => {
  const city = req.params.city;
  try {

    if (!city) {
      return res.status(400).json({ error: 'City is required' });
    }
    const weatherData = await getWeatherData(city);
    const query = 'INSERT INTO weather (city, data) VALUES ($1, $2) RETURNING *';
    const values = [city, weatherData];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/data:
 *   post:
 *     summary: Create a new data entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               value:
 *                 type: string
 *     responses:
 *       200:
 *         description: Data created successfully
 *       400:
 *         description: Name and value are required
 *       500:
 *         description: Error creating data
 */
router.post('/data', async (req, res) => {
  const { name, value } = req.body;
  try {
    if (!name || !value) {
      return res.status(400).json({ error: 'Name and value are required' });
    }
  
    const values = [name, value];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/data:
 *   get:
 *     summary: Retrieve all data entries
 *     responses:
 *       200:
 *         description: Data retrieved successfully
 *       500:
 *         description: Error retrieving data
 */

router.get('/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM data');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/data/{id}:
 *   put:
 *     summary: Update a data entry
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Data ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               value:
 *                 type: string
 *     responses:
 *       200:
 *         description: Data updated successfully
 *       400:
 *         description: Name and value are required
 *       500:
 *         description: Error updating data
 */

router.put('/data/:id', async (req, res) => {
  const id = req.params.id;
  const { name, value } = req.body;
  try {

    if (!name || !value) {
      throw { status: 400, message: 'Name and value are required' };
    }

    const query = 'UPDATE data SET name = $1, value = $2 WHERE id = $3 RETURNING *';
    const values = [name, value, id];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/data/{id}:
 *   delete:
 *     summary: Delete a data entry
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Data ID
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Data deleted successfully
 *       500:
 *         description: Error deleting data
 */

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