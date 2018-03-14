const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser')
const multer  = require('multer')
// const { sendUploadToGCS } = require('./middleware/upload-gcs')
require('dotenv').config()

// App use
const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Multer MiddleWare

// const uploadMem = multer({
//   storage: multer.MemoryStroge,
//   limits:{
//     fileSize: 10*1024*1024
//   }
// })

// const storage = multer.diskStorage({
//   destination: (req,file,cb)=>{
//     cb(null,'public/files')
//   },
//   filename:(req,file,cb)=>{
//     cb(null,`${Date.now()}.${file.originalname.split('.').pop()}`)
//   }
// })

// const uploadDisk = multer({
//   storage
// })


// Multer
// app.post('/upload-gcs', uploadMem.single('avatar'), sendUploadToGCS, function (req, res, next) {
//   console.log(req.file)
//   res.status(200).json({
//     "req.body": req.body,
//     "req.file":req.file
//   })
// })

// app.post('/upload', uploadDisk.single('avatar'), function (req, res, next) {
//   res.status(200).json({
//     "req.body": req.body,
//     "req.file":req.file
//   })
// })

// Monggose
const dbURL = 'mongodb://localhost/e-commerce'
mongoose.connect(dbURL,(err)=>{
  if(!err){
    console.log(`Connected to database`)
  }
});

// Routes
const User = require('./routes/user.routes')
const Product = require('./routes/product.routes')
const Size = require('./routes/size.routes')
const SellProduct = require('./routes/sellProduct.routes')
const Order = require('./routes/order.routes')

// Routing
app.use('/user',User)
console.log()
app.use('/product',Product)
app.use('/size',Size)
app.use('/sellProduct',SellProduct)
app.use('/order',Order)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(3000,()=>{console.log('Running')})