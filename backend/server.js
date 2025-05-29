const express = require('express');
const cors = require('cors');
const db = require('./configs/db.js')

require('dotenv').config()
const app = express();
app.use(express.json());
app.use(cors());


const userRoutes = require('./routes/userRoutes')

// routes
app.use("/api", userRoutes)

const PORT = process.env.PORT || 8001
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})