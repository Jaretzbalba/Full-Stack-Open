const Filter = ({ filterName, handleChange }) => {
  return (
    <>
      find countries
      <input
        type='text'
        value={filterName}
        onChange={handleChange}
      />
    </>
  );
};
export default Filter;
