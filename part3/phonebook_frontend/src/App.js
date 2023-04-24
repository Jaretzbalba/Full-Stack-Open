import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';
import { useState, useEffect } from 'react';
import contactService from './services/contacts';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    contactService.getAll().then(initialContacts => {
      setPersons(initialContacts);
    });
  }, []);

  const addPerson = event => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    contactService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        showMessage('sucess', `Added ${personObject.name} to phonebook`);
      })
      .catch(error => {
        showMessage(
          'error',
          `Information of ${personObject.name} has already been removed from server`
        );
      });
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

  const handleDelete = event => {
    event.preventDefault();

    const id = event.target.value;
    const person = persons.find(person => person.id === id);
    if (window.confirm(`Delete ${person.name}`)) {
      contactService
        .remove(id)
        .then(emptyData => {
          setPersons(persons.filter(person => person.id !== id));
          showMessage('sucess', `${person.name} was successfully deleted`);
        })
        .catch(error => {
          showMessage(
            'error',
            `${person.name} has already been removed from server`
          );
        });
    }
  };

  const showMessage = (type, message) => {
    setMessage({ type: type, text: message });
    setTimeout(() => {
      setMessage(null);
    }, 4000);
  };

  const personsToShow =
    filterName.length === 0
      ? persons
      : persons.filter(person =>
          person.name.toLowerCase().startsWith(filterName.toLowerCase())
        );

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Filter
        filterName={filterName}
        handleChange={handleFilterNameChange}
      />
      <h2>add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons
        persons={personsToShow}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
