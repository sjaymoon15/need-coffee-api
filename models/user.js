const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

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
        ref: 'Group'
      }
    ],
    groups: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Group'
      }
    ],
    favorite_request: {
      type: Schema.Types.ObjectId,
      ref: 'Request'
    },
    last_request: {
      type: Schema.Types.ObjectId,
      ref: 'Request'
    },
    request_history: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Request'
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

UserSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;

      const currentDate = new Date();
      user.updated_at = currentDate;
      if (!user.created_at) {
        user.created_at = currentDate;
      }
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword) {
  const user = this;
  return bcrypt.compare(candidatePassword, user.password);
};

mongoose.model('User', UserSchema);
