const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema ({
    cart:[{
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref : 'User'
    },
    amount: {
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