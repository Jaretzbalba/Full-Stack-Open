require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Contact = require('./models/contact');

morgan.token('data', function getData(req) {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
);

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/info', (request, response) => {
  Contact.find({})
    .then(contacts => {
      response.send(
        `<h1>Phonebook has info for ${
          contacts.length
        } people</h1> <p>${new Date().toLocaleString()}</p>`
      );
    })
    .catch(error => next(error));
});

app.get('/api/persons', (request, response) => {
  Contact.find({}).then(contacts => {
    response.json(contacts);
  });
});

app.get('/api/persons/:id', (request, response) => {
  Contact.findById(request.params.id)
    .then(contact => {
      if (contact) {
        response.json(contact);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: 'name field is missing',
    });
  } else if (!body.number) {
    return response.status(400).json({
      error: 'number field is missing',
    });
  }

  const person = new Contact({
    name: body.name,
    number: body.number,
  });

  person.save().then(savedContact => {
    response.json(savedContact);
  });
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  const note = {
    name: body.name,
    number: body.number,
  };

  Contact.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedContact => {
      response.json(updatedContact);
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
