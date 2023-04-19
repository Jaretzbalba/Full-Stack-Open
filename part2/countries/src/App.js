import Filter from './components/Filter';
import countryService from './services/country';
import { CountryInfo } from './components/CountryInfo';
import { useState, useEffect } from 'react';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    countryService.getAll().then(initialCounties => {
      setCountries(initialCounties);
    });
  }, [filterName]);

  const handleFilter = event => {
    setFilterName(event.target.value);
  };

  const handleToggle = event => {
    event.preventDefault();
    setFilterName(event.target.value);
  };

  const countriesToShow = filterName
    ? countries.filter(country =>
        country.name.common.toLowerCase().includes(filterName.toLowerCase())
      )
    : countries;

  return (
    <div>
      <h1>Countries</h1>
      <Filter
        filterName={filterName}
        handleChange={handleFilter}
      />
      <CountryInfo
        info={countriesToShow}
        handleToggle={handleToggle}
      />
    </div>
  );
};

export default App;
