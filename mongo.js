const mongoose = require('mongoose')
const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

const exitUsage = () => {
  console.log(`Usage: node ${process.argv[1]} <Password> [Name] [Number]`);
  return process.exit(1);
};

const init = () => {
  const password = process.argv[2];
  const url = `mongodb+srv://fullstack:${password}@cluster0-h2vjp.mongodb.net/phonebook?retryWrites=true&w=majority`;

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
};

const addPerson = () => {
  console.log('phonebook:');

  Person
    .find({})
    .then(persons => {
      persons.forEach(({ name, number }) => console.log(name, number));
      mongoose.connection.close();
      process.exit(0);
    });

  return;
}

const listPhonebook = () => {
  const name = process.argv[3] || '';
  const number = process.argv[4] || '';

  const entry = new Person({
    name,
    number
  });

  entry
    .save()
    .then(response => {
      console.log(`added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    });
}

switch (process.argv.length) {
  case 3:
    init();
    return addPerson();
  case 5:
    init();
    return listPhonebook();
  default:
    return exitUsage();
};
