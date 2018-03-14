const express = require('express')
const router = express.Router()
const {addCart, getUserCart, showCartUser} = require('../controllers/cart.controller')

router.post('/addcart', addCart)
router.post('/getCart', getUserCart)
router.post('/showCart', showCartUser)



module.exports = router