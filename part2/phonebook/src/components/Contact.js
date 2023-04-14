const Contact = ({ id, name, number }) => {
  return (
    <p key={id}>
      {name} {number}
    </p>
  );
};

export default Contact;
