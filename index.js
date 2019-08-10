const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const router = require('./routes/authRoutes');
require('dotenv').config();
require('./models');
require('./services/passport');

const MONGO_URI = process.env.MONGO_URI;
const app = express();

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(MONGO_URI, { useNewUrlParser: true });
mongoose.connection
  .once('open', () => console.log('Connected to MongoDB Atlas instance'))
  .on('error', error =>
    console.log('Error connecting to MongoDB Atlas', error)
  );

app.use(morgan('combined'));
app.use(express.static('public'));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

router(passport, app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
