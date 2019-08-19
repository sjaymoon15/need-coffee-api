const mongoose = require('mongoose');
const { Schema } = mongoose;

const StoreSchema = new Schema({
  name: String,
  drinks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'drink'
    }
  ]
});

mongoose.model('Store', StoreSchema);
