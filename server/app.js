const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

// App use
const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
const Cart = require('./routes/cart.routes')

// Routing
app.use('/user',User)
app.use('/product',Product)
app.use('/size',Size)
app.use('/sellProduct',SellProduct)
app.use('/cart',Cart)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(3000,()=>{console.log('Running')})