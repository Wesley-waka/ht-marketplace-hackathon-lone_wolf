const mongoose = require('mongoose');

const dealerSchema = new mongoose.Schema({
  name: String,
  location: String,
  childDealers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ChildDealer' }]
});

module.exports = mongoose.model('Dealer', dealerSchema);