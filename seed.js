// this is temp seed.
const mongoose = require('mongoose');
const faker = require('faker');

require('dotenv').config();
require('./models');

const MONGO_URI = process.env.MONGO_URI;
const User = mongoose.model('user');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(MONGO_URI, { useNewUrlParser: true });

const db = mongoose.connection
  .once('open', () => console.log('Connected to MongoDB Atlas instance'))
  .on('error', error =>
    console.log('Error connecting to MongoDB Atlas', error)
  );

const fakeUsers = [];
for (let i = 0; i < 10; i++) {
  fakeUsers.push({
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  });
}

const createUser = User.create(fakeUsers);

Promise.all([createUser]).then(
  result => {
    console.log(result);
    closeDB();
  },
  error => {
    console.log(error);
    closeDB();
  }
);

const closeDB = () => {
  db.close(() => {
    console.log('The connection to the database has been terminated.');
  });
};
