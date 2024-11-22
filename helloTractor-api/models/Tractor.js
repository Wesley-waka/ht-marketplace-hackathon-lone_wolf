const mongoose = require('mongoose');

const tractorSchema = new mongoose.Schema({
  tractorName: String,
  model: String,
  year: Number,
  images: {type:[String], required: true},
  dealer: { type: mongoose.Schema.Types.ObjectId, ref: 'Dealer' }, //same as brand or make
  isApproved: { type: Boolean, default: false },
  HPCategory: Number,
  engineHoursUsed: Number,
  vehicleID: Number,
  engineCapacity: Number,
  fuelType: String,
  engineConditions: String,
  engineConsumption: Number,
  tyreConditions: String,
  exteriorFeatures: {type:[String], required: true},
  interiorFeatures: {type:[String], required: true},
  price: Number,

  
});

module.exports = mongoose.model('Tractor', tractorSchema);