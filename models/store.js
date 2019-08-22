const mongoose = require('mongoose');
const { Schema } = mongoose;

const StoreSchema = new Schema({
  name: String,
  drinks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Drink'
    }
  ]
});

mongoose.model('Store', StoreSchema);
