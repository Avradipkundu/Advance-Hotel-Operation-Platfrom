const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: String,
  rating: { type: Number, min: 1, max: 5 },
  visible: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
