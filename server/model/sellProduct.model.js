const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sellProductSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    price: {
        type: Number,
        min: [0, 'Price cannot below 0']
    },
    stock: {
        type: Number,
        min: [0, 'Stock cannot below 0']
    },
    size: {
        type: String,
        min: [0, 'Size cannot below 0']
    }
})

const SellProduct = mongoose.model('SellProduct',sellProductSchema)
module.exports = SellProduct