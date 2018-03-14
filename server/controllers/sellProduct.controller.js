const SellProduct = require('../model/sellProduct.model')
const User = require('../model/user.model')
const Product = require('../model/product.model')

module.exports = {
    sellProduct(req,res){
        const { user,product,size } = req.body
        const price = Number(req.body.price)
        const stock = Number(req.body.stock)
        let newSellProduct = new SellProduct({
            user,product, price,stock,size
        })
        
        Product.findOne({'_id': newSellProduct.product})
        .exec()
        .then(productData=>{
            const checkSize = productData.size.filter(size=>{
                if(String(size) === String(newSellProduct.size)){
                    return size
                }
            })
            if(checkSize.length>0){
                User.findOne({'_id': user})
                .exec()
                .then(userData=>{
                    if(userData){
                        // Sell Product
                        newSellProduct.save((err,newData)=>{
                            if(!err){
                                const updateUser = new Promise((resolve,reject)=>{
                                    User.update(
                                        {'_id': user},
                                        { "$push": { "sellProduct": newData._id }},
                                        function(err,success){
                                            if(!err){resolve(success)}
                                            if(err){reject(err)}
                                        }
                                    )
                                })

                                const updateProduct = new Promise((resolve,reject)=>{
                                    Product.update(
                                        {'_id': product},
                                        {"$push": {"sellProduct":newData._id}},
                                        function(err,success){
                                            if(!err){resolve(success)}
                                            if(err){reject(err)}
                                        }
                                    )
                                })

                                Promise.all([updateUser,updateProduct]).then(done=>{
                                    res.status(200).json('Done')
                                })
                            }
                        })
                    }else{
                        res.status(409).json('User unknown')        
                    }
                })
            }else{
                res.status(409).json('Unavailable size')
            }
        })
        .catch(err=>{
            res.status(409).json(err)
        })
    },
    getAll(req,res){
        SellProduct.find()
        .populate('Product')
        .exec()
        .then(sellProductData=>{
            console.log(sellProductData)
            res.status(200).json(sellProductData)
        })
    }
}