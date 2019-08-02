// const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true
    },
    last_name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    admins: [
      {
        type: Schema.Types.ObjectId,
        ref: 'company'
      }
    ],
    favorite_request: {
      type: Schema.Types.ObjectId,
      ref: 'request'
    },
    last_request: {
      type: Schema.Types.ObjectId,
      ref: 'request'
    },
    request_history: [
      {
        type: Schema.Types.ObjectId,
        ref: 'request'
      }
    ],
    updated_at: Date,
    created_at: Date
  },
  { runSettersOnQuery: true }
);

UserSchema.virtual('full_name').get(function() {
  return `${this.first_name} ${this.last_name}`;
});

// UserSchema.pre('save', function(next) {
//   const user = this;
//   if (!user.isModified('password')) {
//     return next();
//   }
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) {
//       return next(err);
//     }
//     bcrypt.hash(user.password, salt, null, (err, hash) => {
//       if (err) {
//         return next(err);
//       }
//       user.password = hash;

//       var currentDate = new Date();
//       user.updated_at = currentDate;
//       if (!user.created_at) {
//         user.created_at = currentDate;
//       }
//       next();
//     });
//   });
// });

// UserSchema.methods.comparePassword = function comparePassword(
//   candidatePassword,
//   cb
// ) {
//   bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
//     cb(err, isMatch);
//   });
// };

module.exports = mongoose.model('user', UserSchema);
