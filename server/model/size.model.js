const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sizeSchema = new Schema ({
    name:  String,
    description: String
})

const Size = mongoose.model('Size',sizeSchema)
module.exports = Size