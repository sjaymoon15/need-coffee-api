const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group'
  },
  date: { type: Date, default: Date.now },
  requests: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Request'
    }
  ],
  fetched_by: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  completed: { type: Boolean, default: false }
});

mongoose.model('Order', OrderSchema);
