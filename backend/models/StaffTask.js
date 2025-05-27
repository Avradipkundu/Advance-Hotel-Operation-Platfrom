// models/StaffTask.js
const mongoose = require('mongoose');

const staffTaskSchema = new mongoose.Schema({
  staff: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  taskType: String, // cleaning, maintenance, etc.
  description: String,
  date: Date,
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('StaffTask', staffTaskSchema);
