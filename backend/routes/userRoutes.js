const express = require('express')
const router = express.Router()
const { createUser, loginUser, myProfile } = require('../controller/UserController')
const { jwtAuthMiddleware } = require('../middleware/authUser')

router.post('/register', createUser)
router.post('/login', loginUser)
router.get('/userProfile', jwtAuthMiddleware, myProfile)

module.exports = router
