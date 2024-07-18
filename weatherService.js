const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const getWeatherData = async (city) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch(error) {
    throw new Error(`Error fetching weather data: ${error.message}`)
  }
};

module.exports = { getWeatherData };
