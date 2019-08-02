const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const MONGO_URI = process.env.MONGO_URI;

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, { useNewUrlParser: true });
mongoose.connection
  .once('open', () => console.log('Connected to MongoDB Atlas instance'))
  .on('error', error =>
    console.log('Error connecting to MongoDB Atlas', error)
  );

app.get('/', (req, res) => {
  res.send('hey there');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
