const mongoose = require('mongoose');
const { Schema } = mongoose;

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
    text: true,
    trim: true
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  order_history: [
    {
      type: Schema.Types.ObjectId,
      ref: 'order'
    }
  ]
});

mongoose.model('Group', GroupSchema);
