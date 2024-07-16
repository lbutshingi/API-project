const axios = require('axios');

const getWeatherData = async (city) => {
  const apiKey = 'aaf9a69f52e1f26d2e43bc03618f6c2c';
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch(error) {
    throw new Error(`Error fetching weather data: ${error.message}`)
  }
};

module.exports = { getWeatherData };
