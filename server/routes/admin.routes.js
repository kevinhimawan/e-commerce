const express = require('express')
const router = express.Router()
const multer  = require('multer')
const uploadToGCS = require('../middleware/upload-gcs')

// Multer
const uploadDisk = multer({
  storage: multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024
})

const { addProduct, getAllShoes, addSize, searchProduct, updateProduct, searchSpecificProductById } = require('../controllers/admin.controller')

router.post('/addproduct', uploadDisk.array('image', 12), uploadToGCS.sendUploadToGCS, addProduct)
router.get('/shoesdata', getAllShoes)
router.post('/addsize', addSize)
router.get('/searchproduct',searchProduct)
router.post('/updateproduct', uploadDisk.array('image', 12), updateProduct)
router.get('/searchspecificproductbyid', searchSpecificProductById)

module.exports = router