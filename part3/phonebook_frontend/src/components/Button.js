const Button = ({ value, handleDelete, text }) => (
  <button
    onClick={handleDelete}
    value={value}
  >
    {text}
  </button>
);

export default Button;
