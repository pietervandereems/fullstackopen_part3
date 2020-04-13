require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/Person');
const unknownEndpoint = require('./services/catchall');
const errorHandler = require('./services/errorhandling');

morgan.token('postdata', (req) => {
  if (req.method === 'POST' && req.body) {
    try {
      return JSON.stringify(req.body);
    }
    catch (e) {
      return 'Body is not JSON';
    }
  }
  return null;
});

const app = express();

app.use(express.static('build'));
app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postdata'));

// Routes
app.get('/info', (request, response, next) => {
  Person.find({})
    .countDocuments()
    .then(count => response.send(`<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`))
    .catch(err => next(err));
});

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => persons.map(person => person.toJSON()))
    .then(personsJSON => response.json(personsJSON))
    .catch(err => next(err));
});

app.get('/api/persons/:id', ({ params: { id } }, response, next) => {
  Person.find({ _id: id })
    .then(persons => {
      if (persons.length === 1) {
        return response.json(persons[0].toJSON());
      }

      response.status(404).end();
    })
    .catch(err => next(err));

});

app.delete('/api/persons/:id', ({ params: { id } }, response, next) => {
  Person.findByIdAndRemove(id)
    .then(result => {
      response.status(204).end();
    })
    .catch(err => next(err));
});

app.post('/api/persons', ({ body }, response, next) => {
  const newPerson = new Person(body);
  newPerson.save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedPersonJSON => response.json(savedPersonJSON))
    .catch(err => next(err));
});

app.put('/api/persons/:id', ({ params: { id }, body }, response, next) => {
  Person.findByIdAndUpdate(id, body, { new: true })
    .then(updatedPerson => updatedPerson.toJSON())
    .then(updatedPersonJSON => response.json(updatedPersonJSON))
    .catch(err => next(err));
});

// Error handlers
app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})