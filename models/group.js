const mongoose = require('mongoose');
const { Schema } = mongoose;

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

mongoose.model('Group', GroupSchema);
