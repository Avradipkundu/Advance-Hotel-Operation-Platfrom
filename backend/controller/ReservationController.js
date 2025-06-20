const Room = require('../models/Room.js')
const User = require('../models/User.js')
const Admin = require('../models/Admin.js')
const Staff = require('../models/Staff.js')
const Reservation = require('../models/Reservation.js')

const reservations = async (req, res) => {
    try {
        const roomId = req.params.id
        const userId = req.user.id
        const { checkInDate, checkOutDate, guests, maidId} = req.body

         if (maidId) {
          await Staff.findByIdAndUpdate(maidId, {status: "in-progress", room: roomId})
        }

        const room = await Room.findById(roomId)
        if (!room) {
            return res.status(404).json({ error: "roomId not found" })
        }

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ error: "user not found" })
        }
        const reservation = new Reservation({ user: userId, room: roomId, checkInDate: checkInDate, checkOutDate: checkOutDate, guests: guests })
        await reservation.save()
        console.log(reservation)
        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ error: "internal server error" })
    }
}

const allReservations = async (req, res) => {
    try {
        const userId = req.user.id
        if (!userId) {
            console.log("user not found")
        }
        const adminData = await Admin.findById(userId)
        if (!adminData || adminData.role !== "admin") {
            return res.status(403).json({ error: "Unauthorized access" });
        }
        const data = await Reservation.find()
            .populate('user')
            .populate('room')
        console.log("data fetched")
        console.log(data)
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "internal server error" })
    }
}

module.exports = { reservations, allReservations }