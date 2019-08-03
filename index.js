const mongoose = require('mongoose');
const express = require('express');
const expressGraphQL = require('express-graphql');
require('dotenv').config();
require('./models');
const schema = require('./schema/schema');

const app = express();
const MONGO_URI = process.env.MONGO_URI;

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(MONGO_URI, { useNewUrlParser: true });
mongoose.connection
  .once('open', () => console.log('Connected to MongoDB Atlas instance'))
  .on('error', error =>
    console.log('Error connecting to MongoDB Atlas', error)
  );

app.get('/', (req, res) => {
  res.send('hey there');
});

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
