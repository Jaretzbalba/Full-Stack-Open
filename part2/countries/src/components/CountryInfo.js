import Country from './Country';
import CountryListItem from './CountryListItem';

export const CountryInfo = ({ info, handleToggle }) => {
  if (info.length === 0) {
    return <p>No results</p>;
  } else if (info.length === 1) {
    return <Country info={info[0]} />;
  } else if (info.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else {
    return (
      <>
        {info.map(country => {
          return (
            <CountryListItem
              key={country.ccn3}
              country={country}
              handleToggle={handleToggle}
            />
          );
        })}
      </>
    );
  }
};
