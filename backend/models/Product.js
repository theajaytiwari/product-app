const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  metaTitle:       { type: String, required: true },
  productName:     { type: String, required: true },
  slug:            { type: String, required: true, unique: true },
  gallery:         [{ type: String }],
  price:           { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  description:     { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)