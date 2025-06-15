const express = require('express');
const cors = require('cors');
const db = require('./configs/db.js')

require('dotenv').config()
const app = express();
app.use(express.json());
app.use(cors());


const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/AdminRoutes.js')
const roomRoutes = require('./routes/RoomRoutes.js')
const reservationRoutes = require('./routes/ReservationRoutes.js')

// routes
app.use("/api", userRoutes)
app.use('/api', adminRoutes)
app.use('/api', roomRoutes)
app.use('/api', reservationRoutes)
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 8001
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})