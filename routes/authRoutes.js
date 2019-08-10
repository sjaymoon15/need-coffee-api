const passport = require('passport');
// require('../services/passport');

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
      failureRedirect: '/login',
      session: false
    }),
    (req, res) => {
      console.log('inside /login route');
      res.send('login successful');
      // res.redirect('/');
    }
  );
};
