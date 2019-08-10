const passport = require('passport');
// require('../services/passport');
const User = require('../models/user');

module.exports = (passport, app) => {
  app.get('/', (req, res) => {
    res.send('/ route works');
  });

  app.get('/login', (req, res) => {
    res.send('login get ?');
  });

  app.post(
    '/login',
    passport.authenticate('local', {
      session: false
    }),
    (req, res) => {
      console.log('inside /login route');
      res.send('login successful');
      // res.redirect('/');
    }
  );

  app.post('/signup', (req, res, next) => {
    const { email, password, first_name, last_name } = req.body;
    // const password = req.body.password;

    if (!email || !password || !first_name || !last_name) {
      return res
        .status(422)
        .send({ error: 'You must provide email, password, and your name.' });
    }
    // see if a user with the given email exists
    User.findOne({ email: email }, function(err, existingUser) {
      if (err) {
        return next(err);
      }

      // if a user with email does exist, return an err
      if (existingUser) {
        return res.status(422).send({ error: 'Email is in use' });
      }
      // if not, create and save user record
      const user = new User({
        email,
        password,
        first_name,
        last_name
      });
      user.save().then(user => res.json({ user: user }));
      // .then(user => res.json({ token: tokenForUser(user) }));
      // respond to req indicating the user was created.
    });
  });
};
