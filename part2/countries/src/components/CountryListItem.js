const CountryListItem = ({ country, handleToggle }) => {
  return (
    <p>
      {country.name.common}
      <button
        onClick={handleToggle}
        value={country.name.common}
      >
        show
      </button>
    </p>
  );
};
export default CountryListItem;
