const express = require('express');
const cors = require('cors');
const db = require('./configs/db.js')

require('dotenv').config()
const app = express();
app.use(express.json());
app.use(cors());


const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/AdminRoutes.js')

// routes
app.use("/api", userRoutes)
app.use('/api', adminRoutes)

const PORT = process.env.PORT || 8001
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})