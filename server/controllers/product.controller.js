
const Product = require('../model/product.model')

module.exports = {
    addProduct(req,res){
        Product.find()
        .exec()
        .then(listProduct=>{
            const findDouble = listProduct.filter(product=>{
                if(product.name.trim().toLowerCase() === req.body.name.trim().toLowerCase()){
                    return product
                }
            })
            if(findDouble.length > 0){
                res.status(409).json({
                    message: 'Product name already been used'
                })
            }else{
                const {name,brand,images} = req.body
                const newProduct = new Product({
                    name,brand,images
                })
                newProduct.save((err,response)=>{
                    if(err){
                        res.status(409).json(err)
                    }
                    res.status(200).json(response)
                })
            }
        })
    },
    listProduct(req,res){
        Product.find()
        .populate('SellProduct')
        .exec()
        .then(listProduct=>{
            const List = listProduct.map(product=>{
                let cheapestTmp = product.SellProduct[0].price;
                const cheapest = product.SellProduct.filter(SellProduct =>{
                    if(SellProduct.price < cheapestTmp){
                        cheapestTmp = SellProduct.price
                    }
                })
                product.Cheapest = cheapestTmp
                return product
            })
            console.log(List[0].Cheapest)
            res.status(200).json(List)
        })
    },
    findProduct(req,res){
        let regex = new RegExp(req.body.input, "i")
        Product.find({$or:[{name: regex},{brand:regex}]})
        .exec()
        .then(productData=>{
            res.status(200).json(productData)
        })
    },
}