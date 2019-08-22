const mongoose = require('mongoose');
const { Schema } = mongoose;

const RequestSchema = new Schema({
  request_by: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  drink: {
    type: Schema.Types.ObjectId,
    ref: 'Drink'
  },
  selected_size: String,
  selected_milk: String,
  other_options: String,
  created_at: { type: Date, default: Date.now }
});

mongoose.model('Request', RequestSchema);
