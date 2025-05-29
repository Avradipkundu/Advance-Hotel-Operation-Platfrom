const mongoose = require('mongoose');
require('dotenv').config()

const mongoURL = process.env.MONGODB_URI
mongoose.connect(mongoURL)

const db = mongoose.connection

// define event listeners for database connection

db.on('connected', () => {
    console.log("Connected to MongoDB server")
})
db.on('error', (err) => {
    console.log("MongoDB connection error: ",err)
})
db.on('disconnected', () => {
    console.log("MongoDB disconnected")
})

// export the database connection
module.exports = db