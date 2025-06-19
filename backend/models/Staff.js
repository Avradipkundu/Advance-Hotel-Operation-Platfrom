const mongoose = require('mongoose');

const staffTaskSchema = new mongoose.Schema({
  room: {type: mongoose.Schema.Types.ObjectId, ref: 'Room',},
  name: { type: String },
  no:{ type: Number, required: true },
  taskType: { type:String }, // cleaning, maintenance, etc.  
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Staff', staffTaskSchema);
