const express = require('express')
const roomRouter = express.Router()
const uploadStorage = require('../middleware/Multer')
const {jwtAuthMiddleware} = require('../middleware/authUser')
const {allRooms,countRooms,roomById,addRooms,updateRooms,deleteRooms} = require('../controller/RoomController')

roomRouter.get('/allRooms', jwtAuthMiddleware, allRooms)
roomRouter.get('/countRooms', countRooms);
roomRouter.get('/roomById/:id', roomById)
roomRouter.post('/addRooms', uploadStorage.single("image"), addRooms)
roomRouter.put('/updateRooms/:id', uploadStorage.single("image"),jwtAuthMiddleware, updateRooms)
roomRouter.delete('/deleteRooms/:id',jwtAuthMiddleware, deleteRooms)

module.exports = roomRouter