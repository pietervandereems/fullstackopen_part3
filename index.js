require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/Person');

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

getUniqueId = () => {
  const id = Math.floor(Math.random() * (9999999 - 1000001)) + 1000000;
  return db.persons.find(person => person.id === id) ?
    getUniqueId() :
    id;
};

app.get('/info', (request, response) => {
  Person.find({})
    .countDocuments()
    .then(count => response.send(`<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`));
});

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => {
      response.json(persons.map(person => person.toJSON()));
    });
});

app.get('/api/persons/:id', ({ params: { id } }, response) => {
  Person.find({ _id: id })
    .then(persons => {
      if (persons.length === 1) {
        return response.json(persons[0].toJSON());
      }

      response.status(404).end();
    });

});

app.delete('/api/persons/:id', ({ params: { id } }, response) => {
  Person.findByIdAndRemove(id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => console.error(error));
});

app.post('/api/persons', (request, response) => {
  const body = request.body;

  const reply400 = () => response.status(400);
  const replyMissing = (type) => reply400().json({ error: `${type} is missing` });

  if (!body.name) {
    return replyMissing('name');
  }

  if (!body.number) {
    return replyMissing('number');
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number
  });

  newPerson.save()
    .then(savedPerson => response.json(savedPerson.toJSON()));
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})