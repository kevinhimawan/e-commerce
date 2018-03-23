const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shoeBiddingSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  size: {
    type: Schema.Types.ObjectId,
    ref: 'ShoeSize'
  },
  shoeProduct: {
    type: Schema.Types.ObjectId,
    ref: 'ShoeProduct'
  },
  bidding: {
    type: Number,
    min: [0, `Biding value cannot below to zero`]
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

const ShoeBidding = mongoose.model('ShoeBidding', shoeBiddingSchema)
module.exports = ShoeBidding