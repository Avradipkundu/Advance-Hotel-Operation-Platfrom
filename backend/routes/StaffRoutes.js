const express = require('express')
const staffRouter = express.Router()
const {jwtAuthMiddleware} = require('../middleware/authUser')
const {allStaffs,availableStaffs,addStaff,updateStaff,deleteStaff} = require('../controller/StaffController')

staffRouter.get('/allStaffs', jwtAuthMiddleware, allStaffs)
staffRouter.get('/availableStaffs', jwtAuthMiddleware, availableStaffs);
staffRouter.post('/addStaff',jwtAuthMiddleware, addStaff)
staffRouter.put('/updateStaff/:id', jwtAuthMiddleware, updateStaff)
staffRouter.delete('/deleteStaff/:id',jwtAuthMiddleware, deleteStaff)

module.exports = staffRouter