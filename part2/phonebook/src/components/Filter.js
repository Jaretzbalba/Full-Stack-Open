const Filter = ({ filterName, handleChange }) => {
  return (
    <>
      filter shown with
      <input
        type='text'
        value={filterName}
        onChange={handleChange}
      />
    </>
  );
};
export default Filter;
