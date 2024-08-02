const db = require('../lib/db')
const bcrypt = require('bcrypt')

const createAkunHandler = async (req, res, next) => {
  try {
    const { nama, email, password, role } = req.body

    const user = await db.akun.findUnique({
      where: {
        email,
      },
    })
    if (user) throw new Error('akun sudah ada')

    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password || 'password', salt)

    await db.akun.create({
      data: {
        nama,
        email,
        password: hashPassword,
        role,
      },
    })
    return res.status(201).json({ message: 'Akun berhasil dibuat' })
  } catch (error) {
    next(error)
  }
}
const updateAkunHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = { ...req.body }

    if (data.password == '') {
      delete data.password
    } else {
      const salt = await bcrypt.genSalt()
      const hashPassword = await bcrypt.hash(data.password, salt)
      data.password = hashPassword
    }

    await db.akun.update({
      data,
      where: {
        id: Number(id),
      },
    })

    return res.status(201).json({ message: 'Akun berhasil diupdate' })
  } catch (error) {
    next(error)
  }
}
const deleteAkunHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    await db.akun.delete({
      where: {
        id: Number(id),
      },
    })
    return res.status(201).json({ message: 'Akun berhasil dihapus' })
  } catch (error) {
    next(error)
  }
}
const getAkunHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await db.akun.findFirst({
      where: {
        id: Number(id),
      },
    })
    return res.status(200).json({ message: 'Success', data })
  } catch (error) {
    next(error)
  }
}
const getAllAkunHandler = async (_, res, next) => {
  try {
    const data = await db.akun.findMany()
    return res.status(200).json({ message: 'Success', data })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createAkunHandler,
  updateAkunHandler,
  deleteAkunHandler,
  getAkunHandler,
  getAllAkunHandler,
}
