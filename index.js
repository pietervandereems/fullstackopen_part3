const express = require('express');
const app = express();

app.use(express.json());

const db = {
  "persons": [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
  ]
};

getUniqueId = () => {
  const id = Math.floor(Math.random() * (9999999 - 1000001)) + 1000000;
  return db.persons.find(person => person.id === id) ?
    getUniqueId() :
    id;
};

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${db.persons.length} people</p><p>${new Date()}</p>`);
});

app.get('/api/persons', (request, response) => {
  response.json(db.persons);
});

app.get('/api/persons/:id', ({ params: { id } }, response) => {
  const person = db.persons.find(person => person.id === Number(id));

  if (person) {
    return response.json(person);
  }

  response.status(404).end();
});

app.delete('/api/persons/:id', ({ params: { id } }, response) => {
  const delId = Number(id);
  db.persons = db.persons.filter(person => person.id !== delId);

  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const body = request.body;
  
  const reply400 = () => response.status(400);
  const replyMissing = (type) => reply400().json({error: `${type} is missing`});

  if (!body.name) {
    return replyMissing('name');
  }

  if (!body.number) {
    return replyMissing('number');
  }

  if (db.persons.find(person => person.name === body.name)) {
    return reply400().json({error: `${body.name} already exists in the Phonebook`});
  }

  const newPerson = { ...request.body, id: getUniqueId() };
  db.persons = [...db.persons, newPerson];
  response.json(newPerson);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})