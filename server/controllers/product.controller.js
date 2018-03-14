const sellProduct = require('../model/sellProduct.model')
const Product = require('../model/product.model')
const Size = require('../model/size.model')

module.exports = {
    addProduct(req,res){
        console.log(req.body)
        Product.find()
        .exec()
        .then(listProduct=>{
            const findDouble = listProduct.filter(product=>{
                if(product.name.trim().toLowerCase() === req.body.name.trim().toLowerCase()){
                    return product
                }
            })
            if(findDouble.length > 0){
                const findDoubleSize = findDouble[0].size.filter(size=>{
                    if(String(req.body.size) === String(size)){
                        return size
                    }
                })
                if(findDoubleSize.length > 0){
                    res.status(409).json({
                        message: 'Product name already been used'
                    })
                }else{
                    Product.update(
                        {'_id':findDouble[0]._id },
                        { "$push": { "size": req.body.size } },
                        function (err, manageProduct) {
                            if(err){
                                res.status(409).json('error')
                            }else{
                                res.status(200).json(manageProduct)
                            }
                        }
                    );
                }
                
            }else{
                const {name,brand,images,size} = req.body
                const newProduct = new Product({
                    name,brand,images,size
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
        .populate('sellProduct')
        .populate('size')
        .exec()
        .then(listProduct=>{
            let newList = []
            const List = listProduct.map(product=>{
                let newObj = {}
                let cheapestTmp = product.sellProduct[0].price;
                const cheapest = product.sellProduct.filter(sellProduct =>{
                    if(sellProduct.price < cheapestTmp){
                        cheapestTmp = sellProduct.price
                    }
                })
                newObj['size'] = product.size,
                newObj['sellProduct'] = product.sellProduct
                newObj['_id'] = product._id
                newObj['name'] = product.name
                newObj['brand'] = product.brand
                newObj['images'] = product.images
                newObj['Cheapest'] = cheapestTmp
                newList.push(newObj)
                return product
            })
            sellProduct.find()
            .exec()
            .then(sellProductData=>{
                Size.find()
                .exec()
                .then(sizeData=>{
                    res.status(200).json({
                        products: newList,
                        sellProducts: sellProductData,
                        size: sizeData
                    })
                })
            })
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