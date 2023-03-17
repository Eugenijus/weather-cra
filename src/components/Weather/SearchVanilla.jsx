import { useEffect, useState } from 'react';

const GEO_API_URL = process.env.REACT_APP_GEO_API_URL;
const RAPID_API_KEY = process.env.REACT_APP_RAPID_API_KEY;
const RAPID_API_HOST = process.env.REACT_APP_GEO_API_HOST;
const minPopulation = 10000;

export const geoApiOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': RAPID_API_KEY,
    'X-RapidAPI-Host': RAPID_API_HOST,
  },
};

const cache = new Map();

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    let myTimeout;
    let invalidateTimeout;

    const searchCities = async (inputValue) => {
      console.log('cache: ', cache);
      setStatus('loading');
      try {
        let cities = [];
        if (cache.get(search)) {
          console.log('cache.get(search): ', cache.get(search));
          cities = cache.get(search);
        } else {
          const response = await fetch(
            `${GEO_API_URL}/cities?minPopulation=${minPopulation}&namePrefix=${inputValue}`,
            geoApiOptions
          );
          const responseJSON = await response.json();
          const { data } = responseJSON;
          console.log('data: ', data);
          cache.set(search, data);
          cities = data;
        }
        setOptions([...new Set([...options, ...cities])]);
        const city = cities[0];
        onSearchChange(city.latitude, city.longitude);
        setStatus('loaded');
      } catch (err) {
        console.error(err);
        setStatus('error');
      }
    };

    if (search.length > 0) {
      myTimeout = setTimeout(() => searchCities(search), 500);
    }
    invalidateTimeout = setTimeout(() => {
      cache.clear();
      console.log('cache cleared');
    }, 100 * 1000);

    return () => {
      clearTimeout(myTimeout);
      clearTimeout(invalidateTimeout);
    };
  }, [search]);

  const handleInputChange = (event) => {
    const searchData = event.target.value;
    setSearch(searchData);
  };

  const handleOpionSelect = (event) => {
    const option = event.target.value;
    const city = options.find((element) => element.name === option);
    setSelectedOption(city.name);
    onSearchChange(city.latitude, city.longitude);
  };

  return (
    <>
      <input type='text' value={search} onChange={handleInputChange} />
      <div>
        {options.length > 0 && (
          <select id='cities' name='cities' value={selectedOption} onChange={handleOpionSelect}>
            {options.map((option, index) => (
              <option key={index} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        )}
      </div>
    </>
  );
};

export default Search;
