const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, unique: true },
  type: String, // single, double, deluxe
  price: Number,
  amenities: [String],
  image:{
    type:String
  },
  status: { type: String, enum: ['available', 'booked', 'maintenance', 'cleaning'], default: 'available' }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
