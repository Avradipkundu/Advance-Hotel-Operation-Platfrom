const mongoose = require('mongoose');

const staffTaskSchema = new mongoose.Schema({
  room: {type: mongoose.Schema.Types.ObjectId, ref: 'Room',},
  name: { type: String },
  no:{ type: Number, required: true , unique: true },
  taskType: { type:String }, // cleaning, maintenance, etc.  
  status: { type: String, enum: ['available', 'in-progress', 'completed'], default: 'available' }
}, { timestamps: true });

module.exports = mongoose.model('Staff', staffTaskSchema);
