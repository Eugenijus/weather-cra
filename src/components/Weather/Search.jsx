import { useState } from 'react';
import AsyncSelect from 'react-select/async';

const API_URL = process.env.REACT_APP_MY_API_URL_LOCAL;
const minPopulation = 5000;

let timer;
function debounce(func, timeout = 1000) {
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const Search = ({ onSearchChange }) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  const promiseOptions = (inputValue) => {
    return new Promise((resolve) => {
      const debouncedSearchCities = debounce(() => {
        const searchCities = async (inputValue) => {
          let cities = [];
          if (!inputValue || inputValue.length === 0) return cities;
          try {
            const response = await fetch(
              `${API_URL}/cities?minPopulation=${minPopulation}&namePrefix=${inputValue}`
            );
            const responseJSON = await response.json();
            const { data } = responseJSON;
            cities = data.map((city) => ({
              id: city.id,
              value: `${city.name}, ${city.region}, ${city.country}`,
              label: `${city.name}, ${city.region}, ${city.country}`,
              name: city.name,
              country: city.country,
              latitude: city.latitude,
              longitude: city.longitude,
            }));
            setOptions(cities);

            return cities;
          } catch (err) {
            console.error(err);
          }
        };

        resolve(searchCities(inputValue));
      });
      debouncedSearchCities();
    });
  };

  const handleOpionSelect = (option) => {
    const { value } = option;
    const city = options.find((element) => element.value === value);
    setSelectedOption(city.value);
    onSearchChange(city.latitude, city.longitude, `${city.name}, ${city.country}`);
  };

  return (
    <>
      <AsyncSelect
        cacheOptions
        defaultOptions={options}
        loadOptions={promiseOptions}
        onChange={handleOpionSelect}
      />
    </>
  );
};

export default Search;
