import React, { useState, useEffect } from 'react';
import { getLocation } from './api/location';
import { fetchWeather } from './api/weather';
import './index.css';
import Button from './components/button';
import Loader from './components/loader';

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
    return <div className="bg-[url(https://images5.alphacoders.com/101/thumb-1920-1019631.jpg) flex justify-center items-center h-screen"><Loader/></div>;
  }

  if (error) {
    return <div className="bg-[url(https://images5.alphacoders.com/101/thumb-1920-1019631.jpg) flex justify-center items-center h-screen text-white text-5xl">Error: {error}</div>;
  }

  const temperature = unit === 'metric' ? weatherData.main.temp : (weatherData.main.temp * 9/5) + 32;
  const temperatureUnit = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="h-screen flex items-center justify-center bg-[url(https://images5.alphacoders.com/101/thumb-1920-1019631.jpg)] bg-no-repeat bg-cover bg-center">
      {weatherData && (
        <div className='text-center shadow-2xl p-20 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 text-lg'>
          <h1 className='text-white font-bold text-3xl max-w-lg rounded-2xl text-center items-center mb-2 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10'>Clima en {weatherData.name}, {weatherData.sys.country} <svg className="w-10 h-10 inline" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a5 5 0 0 1-5-5a5 5 0 0 1 5-5c1-2.35 3.3-4 6-4c3.43 0 6.24 2.66 6.5 6.03L19 11a4 4 0 0 1 4 4a4 4 0 0 1-4 4H6m13-6h-2v-1a5 5 0 0 0-5-5c-2.5 0-4.55 1.82-4.94 4.19C6.73 11.07 6.37 11 6 11a3 3 0 0 0-3 3a3 3 0 0 0 3 3h13a2 2 0 0 0 2-2a2 2 0 0 0-2-2Z"/></svg></h1>
          
          <article className='text-white p-4 rounded-2xl mt-4 bg-opacity-50 bg-clip-padding backdrop-filter backdrop-blur-sm'>
          <p className=''>Condición: {weatherData.weather[0].description}</p>
          <p>Temperatura: {temperature.toFixed(1)} {temperatureUnit}</p>
          <p>Velocidad del viento: {weatherData.wind.speed} m/s</p>
          <p>Porcentaje de nubes: {weatherData.clouds.all}%</p>
          <p>Presión atmosférica: {weatherData.main.pressure} hPa</p>

          </article>
          <div className='mt-8'>  
          <Button onClick={toggleUnit} unit={unit}/>
          </div>
          
          
           
          
        </div>
      )}
    </div>
  );
}

export default App;
