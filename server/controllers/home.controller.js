const ShoeProduct = require('../model/shoeProduct.model')
const ShoeBidding = require('../model/shoeBidding.model')
const User = require('../model/user.model')

module.exports  = {
  getAllProducts (req,res){
    ShoeProduct.find()
    .populate('shoeBidding')    
    .populate('size')
    .populate('images')
    .populate('shoeSellProduct')
    .exec()
    .then(shoeProductData=>{
      res.status(200).json(shoeProductData)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  },
  getSpecificProduct(req,res){
    ShoeProduct.findOne({'_id': req.headers.id})
    .populate('shoeBidding')    
    .populate('size')
    .populate('images')
    .populate('shoeSellProduct')
    .exec()
    .then(shoeProductData=>{
      console.log(shoeProductData)
      res.status(200).json(shoeProductData)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  },
  bidProduct(req,res){
    // Create
    const { userid, shoeProduct, size, notes } = req.body
    const price = Number(req.body.price)
    const duration = req.body.duration.split(' ')[0]
    const dateNow = new Date()
    const durationlength = duration*(1000*3600*24)
    const timeDestroy = new Date(Date.parse(dateNow) + durationlength)
    const newShoeBidding = new ShoeBidding ({
      user: userid, shoeProduct, size, notes, bidding: price, duration, timeDestroy
    })

    newShoeBidding.save()
    .then(newShoeBiddingData=>{
      User.update({'_id': userid},
        {'$push': {shoeBidding: newShoeBiddingData._id}},
      function(err,result){
        if(!err){
          ShoeProduct.update({'_id': shoeProduct},
            {'$push': {shoeBidding: newShoeBiddingData._id}},
          function(err,result){
            if(!err){
              res.status(200).json('DONE')
            }else{
              res.status(500).json('ERROR UPDATE SHOE PRODUCT')
            }
          })
        }else{
          res.status(500).json('ERROR UPDATE USER')
        }
      })
    })
    .catch(err=>{
      res.status(500).json(`ERROR BUILD NEW BIDDING`)
    })
  }
}