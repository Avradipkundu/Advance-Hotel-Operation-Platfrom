const express = require('express')
const reservationRouter = express.Router()
const {jwtAuthMiddleware} = require('../middleware/authUser')
const {reservations,allReservations} = require('../controller/ReservationController')

reservationRouter.post('/reservation/:id', jwtAuthMiddleware, reservations)
reservationRouter.get('/allReservation', jwtAuthMiddleware, allReservations)

module.exports = reservationRouter