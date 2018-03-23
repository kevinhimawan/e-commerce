const express = require('express')
const router = express.Router()

const { shoeProduct, searchProduct, getSpecificProduct, addProduct } = require('../controllers/sell.controller')

router.get('/shoeproduct', shoeProduct)
router.get('/searchproduct', searchProduct)
router.get('/getspecificproduct', getSpecificProduct)
router.post('/addproduct', addProduct)

module.exports = router