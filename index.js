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

app.get('/api/persons', (request, response) => {
  response.json(db.persons);
});

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${db.persons.length} people</p><p>${new Date()}</p>`);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})