require('./models/user');
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');
const morgan = require('morgan');

const MONGO_URI = process.env.MONGO_URI;
const app = express();

app.use(morgan('combined'));
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(authRoutes);

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(MONGO_URI, { useNewUrlParser: true });
mongoose.connection
  .once('open', () => console.log('Connected to MongoDB Atlas instance'))
  .on('error', error =>
    console.log('Error connecting to MongoDB Atlas', error)
  );

app.get('/', requireAuth, (req, res) => {
  res.send(`Authenicated Email: ${req.user.email}`);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
