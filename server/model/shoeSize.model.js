const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shoeSizeSchema = new Schema ({
    eu: String,
    us: String,
    uk: String,
    product: {
        type: Schema.Types.ObjectId,
        ref: 'ShoeProduct'
    },
    footlength: String,
    description: String
})

const ShoeSize = mongoose.model('ShoeSize',shoeSizeSchema)
module.exports = ShoeSize