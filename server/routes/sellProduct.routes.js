const express = require('express')
const router = express.Router()

const { sellProduct } = require('../controllers/sellProduct.controller')

router.post('/sell', sellProduct)

module.exports = router