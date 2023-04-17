import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
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

    if (
      persons.find(person => person.name === newName) &&
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      updateNumber();
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: newName,
      };

      contactService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      });
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

  const handleDelete = event => {
    event.preventDefault();
    const id = event.target.value;
    const person = persons.find(person => person.id === id);
    console.log(person);
    if (window.confirm(`Delete ${person.name}`)) {
      contactService
        .remove(id)
        .then(emptyData => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          showMessage(
            'error',
            person.name + ' has already been removed from server'
          );
        });
    }
  };

  const updateNumber = () => {
    const person = persons.find(person => person.name === newName);
    const updatedPerson = { ...person, number: newNumber };
    contactService
      .update(person.id, updatedPerson)
      .then(returnedPerson => {
        setPersons(
          persons.map(person =>
            person.name !== newName ? person : returnedPerson
          )
        );
        setNewName('');
        setNewNumber('');
        showMessage('sucess', `${person.name} was successfully updated`);
      })
      .catch(error => {
        showMessage(
          'error',
          person.name + ' has already been removed from server'
        );
      });
  };

  const showMessage = (type, message) => {
    setMessage({ type: type, text: message });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
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
