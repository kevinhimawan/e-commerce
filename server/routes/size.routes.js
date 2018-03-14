const express = require('express')
const router = express.Router()

const { addSize,deleteit,getit } = require('../controllers/size.controller')

router.get('/get', getit)
router.post('/add', addSize)
router.post('/delete', deleteit)


module.exports = router