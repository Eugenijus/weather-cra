import { useState, useEffect } from 'react';
import axios from 'axios';

import './Weather.css';

const API_URL = process.env.REACT_APP_MY_API_URL;
console.log('API_URL: ', API_URL);

function Weather() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [error, setError] = useState(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitute] = useState('');
  const [status, setStatus] = useState('idle');

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
    setError(null);
    if (latitude === '' || longitude === '') {
      return;
    }

    const fetchWeather = async () => {
      setStatus('loading');
      let response;
      try {
        response = await axios.get(
          API_URL + 'lat=' + latitude + '&lon=' + longitude
        );
        console.log('response: ', response);
        setCurrentWeather(response.data);
        setStatus('idle');
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };
    fetchWeather();
  }, [latitude, longitude]);

  const handleLatitudeChange = (event) => {
    const { value } = event.target;
    setLatitude(value);
  };

  const handleLongitudeChange = (event) => {
    const { value } = event.target;
    setLongitute(value);
  };

  const { temperature = '', time = '', weatherText = '' } = currentWeather;
  const onlyDate = time.split('T')[0];
  return (
    <>
      {error && <div className='error'>{error}</div>}
      <div className='weather-app-container'>
        <div className='weather-app'>
          <div className='weather-header'>
            <h1>Weather App</h1>
          </div>
          {status === 'loading' ? (
            <div>Loading...</div>
          ) : (
            <>
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
                  <h2>{temperature || 0}°C</h2>
                  <p>{onlyDate}</p>
                  <p>{weatherText}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Weather;
