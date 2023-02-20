import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

import { weatherCodes } from './weatherCodes';
import './Weather.css';

function App() {
  const [weatherCode, setWeatherCode] = useState(0);
  const [currentWeather, setCurrentWeather] = useState({});
  const [temp, setTemp] = useState(0);
  const [dayAndHour, setDayAndHour] = useState('');
  const [latitude, setLatitude] = useState(54.69);
  const [longitude, setLongitute] = useState(25, 28);

  useEffect(() => {
    axios
      .get(
        'https://api.open-meteo.com/v1/forecast?latitude=' +
          latitude +
          '&longitude=' +
          longitude +
          '&current_weather=true&hourly=temperature_2m,weathercode'
      )
      .then((res) => {
        const {
          hourly: { time, temperature_2m, weathercode },
          hourly_units: { temperature_2m: unit },
          current_weather,
        } = res.data;
        setCurrentWeather(current_weather);

        const date = new Date();
        const onlyDate = format(date, 'yyyy-MM-dd');
        const onlyHour = format(date, 'HH:00');
        const timeTarget = onlyDate + 'T' + onlyHour;
        setDayAndHour(timeTarget);
        const index = time.findIndex((t) => t === timeTarget);
        setTemp(temperature_2m[index] + unit);
        setWeatherCode(weathercode[index]);
      })
      .catch((error) => console.error(error));
  }, [latitude, longitude]);

  const weatherCodeText = weatherCodes.get(weatherCode);
  return (
    <div className='weather-app-container'>
      <div className='weather-app'>
        <div className='weather-header'>
          <h1>Weather App</h1>
        </div>
        <div className='weather-body'>
          <div className='weather-icon'></div>
          <div className='weather-details'>
            <h2>Vilnius</h2>
            <p>Temperature: {temp}</p>
            <p>Weather: {weatherCodeText}</p>
            <p>Day: {dayAndHour}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
