const ShoeProduct = require('../model/shoeProduct.model')
const ShoeSellProduct = require('../model/shoeSellProduct.model')
const User = require('../model/user.model')
const jwt = require('jsonwebtoken')

module.exports = {
    shoeProduct(req,res){
        ShoeProduct.find()
        .populate('size')
        .populate('shoeSellProduct')
        .populate('images')
        .exec()
        .then(shoeProductData=>{
            res.status(200).json(shoeProductData)
        })
    },

    searchProduct(req,res){
        const searchkey = req.headers.searchkey.toLowerCase()
        ShoeProduct.find()
        .populate('shoeBidding')    
        .populate('shoeSellProduct')
        .populate('size')
        .populate('images')
        .exec()
        .then(shoeProductData=>{
            const searching = shoeProductData.filter(product=>{
                if(product.name.toLowerCase() === searchkey || product.brand.toLowerCase() === searchkey){
                    return product
                }
            })
            if(searching.length === 0){
                console.log(shoeProductData)
                res.status(200).json(shoeProductData)
            }else{
                res.status(200).json(searching)    
            }
        })
    },

    getSpecificProduct(req,res){
        const id = req.headers.id
        ShoeProduct.findOne({'_id': id})   
        .populate('shoeBidding')    
        .populate('shoeSellProduct')
        .populate('size')
        .populate('images')
        .exec()
        .then(shoeProductData=>{
            res.status(200).json(shoeProductData)
        })
    },

    addProduct(req,res){

        const { userid, shoeProduct, size, notes } = req.body
        const duration = Number(req.body.duration.split(' ')[0])
        const price = Number(req.body.price)
        const dateNow = new Date()
        const durationlength = duration*(1000*3600*24)
        const timeDestroy = new Date(Date.parse(dateNow) + durationlength)

        const newShoeSellProduct = new ShoeSellProduct({
            user: userid, shoeProduct, size, price, duration, timeDestroy
        })
        
        newShoeSellProduct.save()
        .then(newShoeSellProductData=>{
            User.update({'_id': userid},
                {'$push': {shoeSellProduct: newShoeSellProductData._id}},
            function(err,result){
                if(!err){
                    ShoeProduct.update({'_id': shoeProduct},
                        {'$push':{shoeSellProduct: newShoeSellProductData._id}},
                    function(err,result){
                        if(!err){
                            res.status(200).json('DONE')
                        }else{
                            res.status(500).json(err)
                        }
                    })
                }else{
                    res.status(500).json(err)
                }
            })
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
}