const express = require('express');
const cors = require('cors');
const db = require('./db')

require('dotenv').config()
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8001

const userRoutes = require('./routes/userRoutes')


 // routes
app.use("/api", userRoutes)

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})