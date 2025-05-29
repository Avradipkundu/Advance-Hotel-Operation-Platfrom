const express = require('express')
const adminRouter = express.Router()
const { jwtAuthMiddleware } = require('../middleware/authUser')
const { registerAdmin, loginAdmin } = require('../controller/AdminController')

adminRouter.post('/adminRegister', registerAdmin)
adminRouter.post('/adminLogin', loginAdmin)

module.exports = adminRouter
