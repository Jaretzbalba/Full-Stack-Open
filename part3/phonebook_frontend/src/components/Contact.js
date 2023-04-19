import Button from './Button';

const Contact = ({ person, handleDelete }) => {
  return (
    <p>
      {person.name} {person.number}
      <Button
        value={person.id}
        handleDelete={handleDelete}
        text={'delete'}
      />
    </p>
  );
};

export default Contact;
