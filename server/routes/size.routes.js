const express = require('express')
const router = express.Router()

const { addSize } = require('../controllers/size.controller')

router.post('/add', addSize)

module.exports = router