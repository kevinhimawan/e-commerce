const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shoeImageSchema = new Schema({
    name: String,
    path: String,
    product:{
        type: Schema.Types.ObjectId,
        ref: 'ShoeProduct'
    }
})

const ShoeImage = mongoose.model('ShoeImage',shoeImageSchema)
module.exports = ShoeImage