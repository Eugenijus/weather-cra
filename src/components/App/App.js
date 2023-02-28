import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import './Weather.css';

function App() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitute] = useState(0);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitute(position.coords.longitude);
      });
    } else {
      console.log('Geolocation Not Available');
    }
  }, []);

  useEffect(() => {
    axios
      .get(
        'http://localhost:8080/weather?' +
          'lat=' +
          latitude +
          '&lon=' +
          longitude
      )
      .then((res) => {
        setCurrentWeather(res.data);
      })
      .catch((error) => console.error(error));
  }, [latitude, longitude]);

  const handleLatitudeChange = (event) => {
    const { value } = event.target;
    setLatitude(value);
  };

  const handleLongitudeChange = (event) => {
    const { value } = event.target;
    setLongitute(value);
  };

  const { temperature = 0.0, time = '', weatherText = '' } = currentWeather;
  const onlyDate = time.split('T')[0];
  return (
    <div className='weather-app-container'>
      <div className='weather-app'>
        <div className='weather-header'>
          <h1>Weather App</h1>
        </div>
        <div className='weather-input'>
          <div>
            <label>
              Latitude:{' '}
              <input
                value={latitude}
                onChange={handleLatitudeChange}
                min='-90'
                max='90'
                size='15'
                type='number'
              />
            </label>
          </div>
          <div>
            <label>
              Longitude:{' '}
              <input
                value={longitude}
                onChange={handleLongitudeChange}
                min='-180'
                max='180'
                size='15'
                type='number'
              />
            </label>
          </div>
        </div>
        <div className='weather-body'>
          <div className='weather-icon'></div>
          <div className='weather-details'>
            {/* <h2>Vilnius</h2> */}
            <h2>{temperature || 0}°C</h2>
            <p>Day: {onlyDate}</p>
            <p>Weather: {weatherText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
