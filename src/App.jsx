import React, { useState, useEffect } from 'react';
import { getLocation } from './api/location';
import { fetchWeather } from './api/weather';
import './index.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unit, setUnit] = useState('metric');

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const { latitude, longitude } = await getLocation();
        const data = await fetchWeather(latitude, longitude);
        setWeatherData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getWeatherData();
  }, []);

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  if (loading) {
    return <div className="App">Cargando...</div>;
  }

  if (error) {
    return <div className="App">Error: {error}</div>;
  }

  const temperature = unit === 'metric' ? weatherData.main.temp : (weatherData.main.temp * 9/5) + 32;
  const temperatureUnit = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="App">
      {weatherData && (
        <div>
          <h1>Clima en {weatherData.name}, {weatherData.sys.country}</h1>
          <p>Condición: {weatherData.weather[0].description}</p>
          <p>Temperatura: {temperature.toFixed(1)} {temperatureUnit}</p>
          <p>Velocidad del viento: {weatherData.wind.speed} m/s</p>
          <p>Porcentaje de nubes: {weatherData.clouds.all}%</p>
          <p>Presión atmosférica: {weatherData.main.pressure} hPa</p>
          <button onClick={toggleUnit}>
            Cambiar a {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
