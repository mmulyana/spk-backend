const db = require('../lib/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const loginHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await db.akun.findFirst({
      where: {
        email,
      },
    })
    if (!user) throw new Error('akun tidak ada')

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      throw new Error('Invalid name or email and password')
    }

    const token = jwt.sign(
      { nama: user.nama, email: user.email, role: user.role },
      process.env.SECRET || '',
      {
        expiresIn: '2d',
      }
    )

    const payload = {
      token,
    }

    return res.status(200).json({
      data: payload,
      message: 'Login sukses',
    })
  } catch (error) {
    next(error)
  }
}

const registerHandler = async (req, res, next) => {
  try {
    const { nama, email, password } = req.body
    const user = await db.akun.findUnique({
      where: {
        email,
      },
    })
    if (user) throw new Error('akun sudah ada')

    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)

    await db.akun.create({
      data: {
        nama,
        email,
        password: hashPassword,
        role: 'MANAGER',
      },
    })

    return res.status(201).json({
      message: 'Register sukses',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { loginHandler, registerHandler }
