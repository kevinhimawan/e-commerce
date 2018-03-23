const express = require('express')
const router = express.Router()

const { getAllProducts, getSpecificProduct, addProduct, bidProduct } = require('../controllers/home.controller')

router.get('/getallproducts', getAllProducts)
router.get('/getspecificproduct', getSpecificProduct)
router.post('/bidproduct', bidProduct)

module.exports = router