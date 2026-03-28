const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Joi = require('joi')

const signupSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required()
})

exports.signup = async (req, res) => {
  const { error } = signupSchema.validate(req.body)
  if (error) return res.status(400).json({ message: error.details[0].message })

  try {
    const exists = await User.findOne({ username: req.body.username })
    if (exists) return res.status(400).json({ message: 'Username already taken' })

    const hashed = await bcrypt.hash(req.body.password, 10)
    await User.create({ username: req.body.username, password: hashed })
    res.status(201).json({ message: 'User created successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })

    const match = await bcrypt.compare(req.body.password, user.password)
    if (!match) return res.status(400).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.json({ token })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}