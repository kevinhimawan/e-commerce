const express = require('express')
const router = express.Router()
const {createUser,getData, loginUser} = require('../controllers/login.controller')

router.get('/testing',(req,res)=>{
    res.status(200).json('halo')
})
router.post('/create',createUser)
router.post('/login', loginUser)
router.get('/get',getData)

module.exports = router