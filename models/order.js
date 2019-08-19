const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
  group: {
    type: Schema.Types.ObjectId,
    ref: 'group'
  },
  date: { type: Date, default: Date.now },
  requests: [
    {
      type: Schema.Types.ObjectId,
      ref: 'request'
    }
  ],
  fetched_by: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  completed: { type: Boolean, default: false }
});

mongoose.model('Order', OrderSchema);
