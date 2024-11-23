import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  facebookId: { type: String },
  // images: {type:[String], required: true},
  matchedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  images: {type:[String]},
  twoFactorCode: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  user: { type: String, enum: ['buyer','seller','admin','"buyer"','"seller"','"admin"']},
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
  // location: {
  //   type: { type: String, default: 'Point' },
  //   coordinates: [Number],
  // },
  totalRating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  google: {
    id: String,
    email: String
  },
  facebook: {
    id: String,
    email: String
  },
  phoneNumber: { type: String },
});

userSchema.index({ location: '2dsphere'});

export default model('User', userSchema);