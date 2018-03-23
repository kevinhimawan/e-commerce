const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
// const { sendUploadToGCS } = require('./middleware/upload-gcs')
require('dotenv').config()

// App use
const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Monggose
const dbURL = 'mongodb://kevinhimawan:12345@ds113179.mlab.com:13179/ecommercedb'
mongoose.connect(dbURL,(err)=>{
  if(!err){
    console.log(`Connected to database`)
  }
});

app.use('/', (req,res)=>{
  console.log('hi')
})

// Routes
const Login = require('./routes/login.routes')
const Admin = require('./routes/admin.routes')
const Sell = require('./routes/sell.routes')
const Home = require('./routes/home.routes')

// Routing
app.use('/login',Login)
app.use('/admin',Admin)
app.use('/sell', Sell)
app.use('/home', Home)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(3000,()=>{console.log('Running')})