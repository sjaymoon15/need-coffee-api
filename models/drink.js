const mongoose = require('mongoose');
const { Schema } = mongoose;

const DrinkSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: 'Store'
  },
  available_sizes: [],
  milk_options: []
});

mongoose.model('Drink', DrinkSchema);
