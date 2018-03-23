const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shoeProductSchema = new Schema({
    name: {
        type: String,
        unique: [true, 'This product has already listed']
    },
    size: [{
        type: Schema.Types.ObjectId,
        ref: 'ShoeSize'
    }],
    brand:  String,
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'ShoeImage'
    }],
    shoeSellProduct:[{
        type: Schema.Types.ObjectId,
        ref: 'ShoeSellProduct'
    }],
    shoeBidding:[{
      type: Schema.Types.ObjectId,
      ref: 'ShoeBidding'
    }]
})

const ShoeProduct = mongoose.model('ShoeProduct', shoeProductSchema)
module.exports = ShoeProduct