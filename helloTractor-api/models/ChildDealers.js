const mongoose = require('mongoose');

const childDealerSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  dealer: { type: mongoose.Schema.Types.ObjectId, ref: 'Dealer' },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number],
  },
});

module.exports = mongoose.model('Dealer', childDealerSchema);