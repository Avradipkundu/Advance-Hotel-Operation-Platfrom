const express = require('express')
const roomRouter = express.Router()
const uploadStorage = require('../middleware/Multer')
const {allRooms,addRooms,updateRooms} = require('../controller/RoomController')

roomRouter.get('/allRooms', allRooms)
roomRouter.post('/addRooms', uploadStorage.single("image"), addRooms)
roomRouter.put('/updateRooms/:id', updateRooms)

module.exports = roomRouter