import { useState, useEffect } from 'react';
import axios from 'axios';

import './Weather.css';
import LocationMap from '../LocationMap/LocationMap';
import { getPNGIconUrl } from './weatherCodes';
import Search from './Search';

const API_URL = process.env.REACT_APP_MY_API_URL_LOCAL;

function Weather() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Weather App');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitute] = useState('');
  const [status, setStatus] = useState('idle');
  const locationNotProvided = latitude === '' || longitude === '';

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
    if (locationNotProvided) {
      return;
    }

    const fetchWeather = async () => {
      setStatus('loading');
      let response;
      try {
        response = await axios.get(`${API_URL}/weather?lat=${latitude}&lon=${longitude}`);
        setCurrentWeather(response.data);
        setStatus('idle');
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };
    fetchWeather();
  }, [latitude, longitude, locationNotProvided]);

  const handleLatitudeChange = (event) => {
    const { value } = event.target;
    setLatitude(value);
  };

  const handleLongitudeChange = (event) => {
    const { value } = event.target;
    setLongitute(value);
  };

  const handleSearchChange = (latitude, longitude, city) => {
    setLatitude(latitude);
    setLongitute(longitude);
    setCity(city);
  };

  const { temperature = '', time = '', weatherText = '', weathercode = 45 } = currentWeather;
  const onlyDate = time.split('T')[0];
  return (
    <>
      {error && <div className='error'>{error}</div>}
      <Search onSearchChange={handleSearchChange} />
      <div className='weather-app-container'>
        <div className='weather-app'>
          <div className='weather-header'>
            <h1>{city}</h1>
          </div>
          <div className='weather-input'>
            <div className='weather-input-wrapper'>
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
            <div className='weather-input-wrapper'>
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
          {status === 'idle' && null}
          {status === 'loading' ? (
            <div>Loading...</div>
          ) : (
            <div className='weather-body'>
              <div className='weather-icon'>
                <img src={getPNGIconUrl(weathercode)} alt='logo' />
              </div>
              <div className='weather-details'>
                <h2>{temperature || 0}°C</h2>
                <p>{onlyDate}</p>
                <p>{weatherText}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {!locationNotProvided && <LocationMap lat={latitude} lng={longitude} />}
    </>
  );
}

export default Weather;
