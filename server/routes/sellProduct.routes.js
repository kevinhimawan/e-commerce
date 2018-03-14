const express = require('express')
const router = express.Router()

const { sellProduct, getAll } = require('../controllers/sellProduct.controller')

router.post('/sell', sellProduct)
router.get('/', getAll )

module.exports = router