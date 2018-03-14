const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        unique: [true, 'This product has already listed']
    },
    size: [{
        type: Schema.Types.ObjectId,
        ref: 'Size'
    }],
    SellProduct: [{
        type:Schema.Types.ObjectId,
        ref: 'SellProduct'
    }],
    stock:{
        type: Number,
        min: [0, 'Stock cannot below 0']
    },
    brand:  String,
    images: String
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product