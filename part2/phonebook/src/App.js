import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  const addPerson = event => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
      id: newName,
    };

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
    }
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleFilterNameChange = event => {
    setFilterName(event.target.value);
  };

  const personsToShow =
    filterName.length === 0
      ? persons
      : persons.filter(person => person.name.toLowerCase().startsWith(filterName.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterName={filterName}
        handleChange={handleFilterNameChange}
      />
      <h3>add a new</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
