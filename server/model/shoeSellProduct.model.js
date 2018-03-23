const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shoeSellProductSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    shoeProduct: {
        type: Schema.Types.ObjectId,
        ref: 'ShoeProduct'
    },
    size: {
        type: Schema.Types.ObjectId,
        ref: 'ShoeSize'
    },
    price: {
        type: Number,
        min: [0, `Price cannot below 0`]
    },
    duration:{
        type: Number
    },
    timeDestroy:{
        type: Date
    },
    created:{
        type: Date,
        default: Date.now
    },
    updated:{
        type: Date,
        default: Date.now
    },
    notes: String
})

const ShoeSellProduct = mongoose.model('ShoeSellProduct', shoeSellProductSchema)

module.exports = ShoeSellProduct