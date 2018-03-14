const Order = require('../model/order.model')
const Product = require('../model/product.model')
const User = require('../model/user.model')
const jwt = require('jsonwebtoken')
const SellProduct = require('../model/sellProduct.model')


module.exports = {
    // addCart(req,res){
    //     const decoded = jwt.verify(req.body.token,process.env.secret_key)
        
    //     const getProduct = new Promise ((resolve,reject)=>{
    //         Product.findOne({"_id": req.body.product})
    //         .populate('SellProduct')
    //         .exec()
    //         .then(dataProduck=>{
    //             resolve(dataProduck)
    //         })
    //         .catch(err=>{
    //             reject(err)
    //         })
    //     })

    //     const getUser = new Promise ((resolve,reject)=>{
    //         User.findOne({'email': decoded.email})
    //         .exec()
    //         .then(userData =>{
    //             resolve(userData)
    //         })
    //         .catch(err=>{
    //             reject(err)
    //         })
    //     })

    //     Promise.all([getProduct,getUser]).then(value=>{
    //         let productData = value[0]
    //         let userData = value[1]
            
    //         let cheapestTMP = productData.SellProduct[0].price
    //         const cheapest = productData.SellProduct.filter(SellProduct=>{
    //             if(SellProduct.price < cheapestTMP){
    //                 cheapestTMP = SellProduct.price
    //             }
    //         })
    //         const getProduct = productData.SellProduct.filter(SellProduct=>{
    //             if(SellProduct.price === cheapestTMP){
    //                 return SellProduct
    //             }
    //         })

    //         Cart.find({'user': userData._id,"status" : false})
    //         .exec()
    //         .then(cartData=>{
    //             if(cartData.length > 0){
    //                 Cart.update(
    //                     {'_id':cartData[0]._id },
    //                     { "$push": { "sellProduct": getProduct[0]._id } },
    //                 function(err,response){
    //                     res.status(200).json(response)
    //                 })
    //             }else{
    //                 const newCart = new Cart({
    //                     user: userData._id,
    //                     sellProduct: getProduct[0]._id
    //                 })
    //                 newCart.save((err,newCartData)=>{
    //                     if(err){
    //                         res.status(409).json(err)
    //                     }else{
    //                         User.update(
    //                             {'_id': userData._id},
    //                             {"$push": {"cart" : newCartData._id}},
    //                         function (err,response){
    //                             res.status(200).json(response)
    //                         })
    //                     }
    //                 })
    //             }
    //         })
    //     })
    // },
    // getUserCart(req,res){
    //     const decoded = jwt.verify(req.body.token,process.env.secret_key)
    //     User.findOne({'email': decoded.email})
    //     .exec()
    //     .then(userData=>{
    //         Cart.findOne({"user": userData._id},{"status": false})
    //         .exec()
    //         .then(cartData=>{
    //             let checkCount = []
    //             for(let i = 0; i < cartData.sellProduct.length; i++){
    //                 let count = 0
    //                 for(let j = 0; j < checkCount.length;j++){
    //                     if(String(checkCount[j]) === String(cartData.sellProduct[i])){
    //                         count++
    //                     }
    //                 }
    //                 if(count === 0){
    //                     checkCount.push(cartData.sellProduct[i])
    //                 }
    //             }
    //             res.status(200).json(checkCount.length)
    //         })
    //     })
    // },

    // showCartUser(req,res){
    //     const decoded = jwt.verify(req.body.token,process.env.secret_key)
    //     User.findOne({'email': decoded.email})
    //     .exec()
    //     .then(userData=>{
    //         Cart.findOne({"user": userData._id},{"status": false})
    //         .exec()
    //         .then(cartData=>{
    //             let checkCount = []
    //             for(let i = 0; i < cartData.sellProduct.length; i++){
    //                 let count = 0
    //                 for(let j = 0; j < checkCount.length;j++){
    //                     if(String(checkCount[j]) === String(cartData.sellProduct[i])){
    //                         count++
    //                     }
    //                 }
    //                 if(count === 0){
    //                     checkCount.push(cartData.sellProduct[i])
    //                 }
    //             }
    //             const allProduct = checkCount.map(product=>{
    //                 return new Promise((resolve,reject)=>{
    //                     let count = 0
    //                     for(let j = 0; j < cartData.sellProduct.length;j++){
                            
    //                         if(String(product) === String(cartData.sellProduct[j])){
    //                             count++
    //                         }
    //                     }
    //                     const getProduct = new Promise((resolve,reject)=>{
    //                         let newObj = {}
    //                         SellProduct.findOne({'_id': product})
    //                         .exec()
    //                         .then(dealData=>{
    //                             newObj['price'] = dealData.price
    //                             newObj['size'] = dealData.size
    //                             Product.findOne({'_id': dealData.product})
    //                             .exec()
    //                             .then(productData=>{
    //                                 newObj['productName'] = productData.name
    //                                 newObj['brand'] = productData.brand
    //                                 newObj['images'] = productData.images
    //                                 newObj['quantity'] = count
    //                                 newObj['total'] = count * dealData.price
    //                                 resolve(newObj)
    //                             })
    //                         })
    //                     })
    
    //                     getProduct.then(productData=>{
    //                         resolve(productData)
    //                     })
    //                 })
    //             })

    //             Promise.all(allProduct).then(data=>{
    //                 console.log(data)
    //                 res.status(200).json(data)
    //             }).catch(err=>{
    //                 res.status(500).send(err)
    //             })

    //         })
    //     })
    // }

    // deleteit(req,res){
    //     Cart.deleteMany({"user": '5aa7633abe58ae04932a5a12'})
    //     .then(response=>{
    //         res.status(200).json(response)
    //     })
    // }
}