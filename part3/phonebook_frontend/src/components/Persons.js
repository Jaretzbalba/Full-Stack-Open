import Contact from './Contact';

const Persons = ({ persons, handleDelete }) => (
  <>
    {persons.map(person => {
      return (
        <Contact
          key={person.name}
          person={person}
          handleDelete={handleDelete}
        />
      );
    })}
  </>
);

export default Persons;
