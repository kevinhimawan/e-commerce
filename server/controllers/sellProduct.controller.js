const SellProduct = require('../model/sellProduct.model')
const User = require('../model/user.model')
const Product = require('../model/product.model')

module.exports = {
    sellProduct(req,res){
        const { user,product,price,stock,size } = req.body
        let newSellProduct = new SellProduct({
            user,product,price : Number(price),stock: Number(stock),size
        })
        const addNewSellProduct = new Promise((resolve,reject)=>{
            newSellProduct.save((err,product)=>{
                if(err){reject(err)}
                resolve(product)
            })

        })

        const pushUser = new Promise((resolve,reject)=>{
            User.update(
                {'_id':user },
                { "$push": { "sellProduct": newSellProduct._id } },
                function (err, manageUser) {
                    if(err){
                        resolve(err)
                    }else{
                        resolve(manageUser)
                    }
                }
            );
        })
        
        const pushProduct = new Promise ((resolve,reject)=>{
            Product.update(
                {'_id': product},
                {"$push":{"SellProduct": newSellProduct._id}},
                function(err,manageProduct){
                    if(err){reject(err)}else{resolve(manageProduct)}
                }
            )
        })

        Promise.all([addNewSellProduct,pushUser,pushProduct]).then((values)=>{
            res.status(200).json('DONE')
        })
    }
}