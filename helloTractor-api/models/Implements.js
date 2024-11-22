import { Schema, model as _model } from 'mongoose';

const implementSchema = new Schema({
  model: String,
  year: Number,
  images: [String],
  dealer: { type: Schema.Types.ObjectId, ref: 'Dealer' }, //same as brand
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

export default _model('Tractor', implementSchema);


//Dealer and technicians