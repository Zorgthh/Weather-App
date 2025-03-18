import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (lat, lon) => {
  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching the weather data:', error);
    throw error;
  }
};
