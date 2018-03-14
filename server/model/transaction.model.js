const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema ({
    idTransaction: String,
    user: {
        type: Schema.Types.ObjectId,
        ref : 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    price: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: Boolean,
})

const Transaction = mongoose.model('Transaction',transactionSchema)

module.exports = Transaction