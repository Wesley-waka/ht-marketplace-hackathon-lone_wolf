const mongoose = require('mongoose');

const implementSchema = new mongoose.Schema({
  model: String,
  year: Number,
  images: [String],
  dealer: { type: mongoose.Schema.Types.ObjectId, ref: 'Dealer' }, //same as brand
  implementType: String,
  implementCategory: String,
  implementPower: Number,
  ModelTyneFix: [String],
  ModelTyneThickness: Number,
  NumberofTyne: Number,
  frameTyne: String,
  interTyneSpacing: Number,
  gapBetweenFrontTyne: Number,
  RearTyne: Number,
  TyneHeight: Number,
  mostHeightGround: Number,
  height: Number,
  width: Number,
  length: Number,
  totalWeigth: Number,
  widthOfCut: Number,
  powerRequired: Number,
  isApproved: { type: Boolean, default: false },
});

module.exports = mongoose.model('Tractor', implementSchema);


//Dealer and technicians