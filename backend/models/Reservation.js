const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    checkInDate: {
        type: Date,        
    },
    checkOutDate: {
        type: Date,        
    },
    guests: Number,
    status: { type: String, enum: ['booked', 'checked-in', 'checked-out', 'cancelled'], default: 'booked' }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
