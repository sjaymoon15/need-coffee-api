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
  return match;
};

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    function(req, email, password, done) {
      // User.findOne({ email: email }, function(err, user) {
      //   if (err) {
      //     return done(err);
      //   }
      //   if (!user) {
      //     return done(null, false);
      //   }
      //   if (!user.verifyPassword(password)) {
      //     return done(null, false);
      //   }
      //   return done(null, user);
      // });
      User.findOne({ email: email }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }

        console.log(user.comparePassword(password));
        console.log(comparePassword(password, user.password));

        // issue here. this gets called before comparePassword returns true
        if (!user.comparePassword(password)) {
          console.log('compare inside');
          return done(null, false);
        }
        console.log('user ', user);
        return done(null, user);
      });
    }
  )
);
