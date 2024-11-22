import { Schema, model } from 'mongoose';

const dealerSchema = new Schema({
  name: String,
  location: String,
  childDealers: [{ type: Schema.Types.ObjectId, ref: 'ChildDealer' }]
});

export default model('Dealer', dealerSchema);