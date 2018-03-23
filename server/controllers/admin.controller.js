const ShoeSize = require('../model/shoeSize.model')
const ShoeImage = require('../model/shoeImage.model')
const ShoeProduct = require('../model/shoeProduct.model')

module.exports = {
    addProduct(req,res){
        const { name, brand } = req.body
        const newShoeProduct = new ShoeProduct({
            name, brand
        })
        // Create New Product
        newShoeProduct.save()
        .then(newShoeProductData=>{
          console.log(req.files)
            const uploadImage = req.files.map(file=>{
                // Promise All
                return new Promise ((resolve,reject)=>{
                    const newImage = new ShoeImage({
                        name: file.originalname, path: file.cloudStoragePublicUrl, product: newShoeProductData._id
                    })
                    // Create New Image
                    newImage.save()
                    .then(newImageData=>{
                        // Update Image of new product
                        ShoeProduct.update({'_id': newShoeProductData._id},
                            {'$push': {images: newImageData._id}},
                        (err,result)=>{
                            resolve(result)
                        })
                    })
                })
            })

            Promise.all(uploadImage).then(resolve=>{
              console.log('testing')
                res.status(200).json({newShoeProductData})
            })
        })
    },
    
    getAllShoes(req,res){
        ShoeProduct.find()
        .populate('size')
        .populate('images')
        .exec()
        .then(allShoesData=>{
            res.status(200).json(allShoesData)
        })
    },

    addSize(req,res){
        const { product, eu, uk, us, footlength, description } = req.body
        const newShoeSize = new ShoeSize({
            product, eu, uk, us, footlength, description
        })
        newShoeSize.save()
        .then(newShoeSizeData=>{
            ShoeProduct.update({'_id': product},
                {'$push': {size: newShoeSizeData._id}},
            (err,result)=>{
                if(!err){
                    res.status(200).json(result)
                }else{
                    res.status(409).json(err)
                }
            })
        })
    },

    searchProduct(req,res){
        const searchkey = req.headers.searchkey.toLowerCase()
        ShoeProduct.find()
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
                res.status(200).json(shoeProductData)
            }else{
                res.status(200).json(searching)    
            }
        })
    },

    updateProduct(req,res){
        const {id, name, brand } = req.body
        let size = []
        for(let i = 0; i < req.body.size.length; i++){
            size.push(JSON.parse(req.body.size[i]))
        }
        
        let removedphoto;
        let indexComma = req.body.removedphoto.indexOf(',')
        if(indexComma !== -1){
            removedphoto = req.body.removedphoto.split(',')
        }else{
            let array = []
            if(req.body.removedphoto !== ''){
                array.push(req.body.removedphoto)
                removedphoto = array 
            }
        }
        // Update Name and Brand
        ShoeProduct.update({'_id': id},
            {'$set':{'name':name,'brand':brand}},
        function(err,result){
            // Pull Image
            if(removedphoto){
                const bulkPullImage = removedphoto.map(photo=>{
                    return new Promise ((resolve,reject)=>{
                        ShoeProduct.update({'_id': id},
                            {'$pull':{'images': photo}},
                        function(err,result){
                            if(!err){
                                ShoeImage.deleteOne({'_id': photo})
                                .then(result=>{
                                    
                                    resolve(result)
                                }).catch(err=>{
                                    reject(err)
                                })
                            }
                        })
                    })
                })

                if(req.files.length > 0){
                    const bullPushImage = req.files.map(file=>{
                        return new Promise ((resolve,reject)=>{
                            const newImage = new ShoeImage({
                                name: file.originalname, path: `./img/${file.filename}`, product: id
                            })
                            // Create New Image
                            newImage.save()
                            .then(newImageData=>{
                                // Update Image of new product
                                ShoeProduct.update({'_id': id},
                                    {'$push': {images: newImageData._id}},
                                (err,result)=>{
                                    if(!err){
                                        
                                        resolve(result)
                                    }else{
                                        reject(err)
                                    }
                                })
                            })
                        })
                    })

                    if(size.length > 0){
                        const updateSize = size.map(sizeeach=>{
                            return new Promise((resolve,reject)=>{
                                ShoeSize.findOne({'_id':sizeeach._id})
                                .exec()
                                .then(data=>{
                                    resolve(data)
                                })
                                ShoeSize.update({'_id': sizeeach._id},
                                    {'$set':{'eu':sizeeach.eu,'uk':sizeeach.uk,'us':sizeeach.us,'footlength':sizeeach.footlength}},
                                function(err,result){
                                    if(!err){
                                        
                                        resolve(result)
                                    }else{
                                        reject(err)
                                    }
                                })
                            })
                        })

                        // Condition asume all has changed
                        Promise.all(bulkPullImage).then(resultPull=>{
                            Promise.all(bullPushImage).then(resultPush=>{
                                Promise.all(updateSize).then(resultSize=>{
                                    res.status(200).json("DONE")
                                })
                            })
                        })
                    }else{
                        // Condition only Size not change
                        Promise.all(bulkPullImage).then(resultPull=>{
                            Promise.all(bullPushImage).then(resultPush=>{
                                res.status(200).json("DONE")
                            })
                        })
                    }
                }else{
                    if(size.length > 0){
                        const updateSize = size.map(sizeeach=>{
                            return new Promise((resolve,reject)=>{
                                ShoeSize.findOne({'_id':sizeeach._id})
                                .exec()
                                .then(data=>{
                                    resolve(data)
                                })
                                ShoeSize.update({'_id': sizeeach._id},
                                    {'$set':{'eu':sizeeach.eu,'uk':sizeeach.uk,'us':sizeeach.us,'footlength':sizeeach.footlength}},
                                function(err,result){
                                    if(!err){
                                        
                                        resolve(result)
                                    }else{
                                        reject(err)
                                    }
                                })
                            })
                        })

                        // Condition only Push not change
                        Promise.all(bulkPullImage).then(resultPull=>{
                            Promise.all(updateSize).then(resultSize=>{
                                res.status(200).json("DONE")
                            })
                        })
                    }else{
                        // Condition only Pull Change
                        Promise.all(bulkPullImage).then(resultPull=>{
                            res.status(200).json("DONE")
                        })
                    }
                }
            }else{
                if(req.files.length > 0){
                    const bullPushImage = req.files.map(file=>{
                        return new Promise ((resolve,reject)=>{
                            const newImage = new ShoeImage({
                                name: file.originalname, path: `./img/${file.filename}`, product: id
                            })
                            // Create New Image
                            newImage.save()
                            .then(newImageData=>{
                                // Update Image of new product
                                ShoeProduct.update({'_id': id},
                                    {'$push': {images: newImageData._id}},
                                (err,result)=>{
                                    if(!err){
                                        
                                        resolve(result)
                                    }else{
                                        reject(err)
                                    }
                                })
                            })
                        })
                    })

                    if(size.length > 0){
                        const updateSize = size.map(sizeeach=>{
                            return new Promise((resolve,reject)=>{
                                ShoeSize.findOne({'_id':sizeeach._id})
                                .exec()
                                .then(data=>{
                                    resolve(data)
                                })
                                ShoeSize.update({'_id': sizeeach._id},
                                    {'$set':{'eu':sizeeach.eu,'uk':sizeeach.uk,'us':sizeeach.us,'footlength':sizeeach.footlength}},
                                function(err,result){
                                    if(!err){
                                        
                                        resolve(result)
                                    }else{
                                        reject(err)
                                    }
                                })
                            })
                        })
                        // COndition only Push and Size Change
                        Promise.all(bullPushImage).then(resultPush=>{
                            Promise.all(updateSize).then(resultSize=>{
                                res.status(200).json("DONE")
                            })
                        })    
                    }else{
                        // COndition only Push Change
                        Promise.all(bullPushImage).then(resultPush=>{
                            res.status(200).json("DONE")
                        })
                    }
                }else{
                    if(size.length > 0){
                        const updateSize = size.map(sizeeach=>{
                            return new Promise((resolve,reject)=>{
                                ShoeSize.findOne({'_id':sizeeach._id})
                                .exec()
                                .then(data=>{
                                    resolve(data)
                                })
                                ShoeSize.update({'_id': sizeeach._id},
                                    {'$set':{'eu':sizeeach.eu,'uk':sizeeach.uk,'us':sizeeach.us,'footlength':sizeeach.footlength}},
                                function(err,result){
                                    if(!err){
                                        
                                        resolve(result)
                                    }else{
                                        reject(err)
                                    }
                                })
                            })
                        })
                        // COndition only Size Change
                        Promise.all(updateSize).then(resultSize=>{
                            res.status(200).json("DONE")
                        })
                    }else{
                        // COndition all no change
                        res.status(200).json("DONE")
                    }
                }
            }
        })
    },

    searchSpecificProductById(req,res){
        const productId = req.headers.index
        ShoeProduct.findOne({'_id': productId})
        .populate('size')
        .populate('images')
        .exec()
        .then(shoeProductData=>{
            res.status(200).json(shoeProductData)
        })
    }
}