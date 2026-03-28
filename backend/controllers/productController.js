const Product = require('../models/Product')
const Joi = require('joi')

const productSchema = Joi.object({
  metaTitle:       Joi.string().required(),
  productName:     Joi.string().required(),
  slug:            Joi.string().required(),
  gallery:         Joi.array().items(Joi.string()).min(1).required(),
  price:           Joi.number().required(),
  discountedPrice: Joi.number().required(),
  description:     Joi.string().required()
})

exports.getAll = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 })
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.getOne = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.create = async (req, res) => {
  const { error } = productSchema.validate(req.body)
  if (error) return res.status(400).json({ message: error.details[0].message })

  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.update = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.remove = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: 'Product deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}
