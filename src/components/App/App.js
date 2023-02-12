import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import './App.css';

function App() {
  const [weather, setWeather] = useState({});
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
          '&hourly=temperature_2m'
      )
      .then((res) => {
        const {
          hourly: { time, temperature_2m },
          hourly_units: { temperature_2m: unit },
        } = res.data;

        const date = new Date();
        const onlyDate = format(date, 'yyyy-MM-dd');
        const onlyHour = format(date, 'HH:00');
        const timeTarget = onlyDate + 'T' + onlyHour;
        setDayAndHour(timeTarget);
        const index = time.findIndex((t) => t === timeTarget);
        setTemp(temperature_2m[index] + unit);
        setWeather(res.data);
      })
      .catch((error) => console.error(error));
  }, [latitude, longitude]);

  return (
    <div className='App'>
      <header>weather</header>
      <div>{dayAndHour}</div>
      <div>{temp}</div>
    </div>
  );
}

export default App;
