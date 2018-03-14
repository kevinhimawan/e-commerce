const express = require('express')
const router = express.Router()
const { createUser,getData, loginUser, deleteUser } = require('../controllers/user.controller')

router.post('/create',createUser)
router.post('/', loginUser)
router.get('/get',getData)
router.post('/delete',deleteUser)

module.exports = router