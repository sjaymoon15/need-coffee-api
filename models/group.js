const mongoose = require('mongoose');
const { Schema } = mongoose;
const shortid = require('shortid');

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
    text: true,
    trim: true,
    unique: true,
    minlength: 5,
    maxlength: 20
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  admins: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  order_history: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order'
    }
  ]
});

GroupSchema.pre('save', function(next) {
  const group = this;
  const uniqueGroupName = `${group.name}_${shortid.generate()}`;
  group.name = uniqueGroupName;
  next();
});

mongoose.model('Group', GroupSchema);
