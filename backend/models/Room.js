const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNo: { type: String, unique: true },
  image:{
    type:String
  },
  name: {type: String,},
  type: String, // single, double, luxury, family suite
  price: Number,
  rating: Number,
  features: [String],
  status: { type: String, enum: ['available', 'booked', 'maintenance', 'cleaning'], default: 'available' },
  description: {type: String}
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
