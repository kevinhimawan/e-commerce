const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const orderSchema = new Schema ({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },
    sellProduct:[{
        type: Schema.Types.ObjectId,
        ref: 'SellProduct'       
    }]
})

const Order = mongoose.model('Cart',orderSchema)
module.exports = Order