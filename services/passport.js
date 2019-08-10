const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

const comparePassword = async (candidatePassword, userPassword) => {
  const match = await bcrypt.compare(candidatePassword, userPassword);
  // bcrypt.compare(candidatePassword, userPassword, function(err, isMatch) {
  //   console.log('isMatch in ps', isMatch);
  //   return isMatch;
  // });
  console.log(match);
  return match;
};

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    (req, email, password, done) => {
      User.findOne({ email: email }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }

        user
          .comparePassword(password, user.password)
          .then(match => {
            if (match) {
              console.log('compare inside');
              return done(null, user);
            } else {
              return done(null, false);
            }
          })
          .catch(err => done(err));
      });
    }
  )
);
