const express = require('express')
const router = express.Router()

const { listProduct,addProduct,findProduct } = require('../controllers/product.controller')

router.post('/add', addProduct)
router.get('/',listProduct)
router.post('/findProduct',findProduct)

module.exports = router