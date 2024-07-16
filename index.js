const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', routes); // Assuming your routes are defined under '/api'

// Default route handler
app.get('/', (req, res) => {
  res.send('Welcome to the API!'); // Replace with your desired default response
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});