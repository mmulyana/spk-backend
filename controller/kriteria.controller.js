const db = require('../lib/db')

const createKriteriaHandler = async (req, res, next) => {
  try {
    const { nama, bobot, minimum, keterangan } = req.body
    await db.kriteria.create({
      data: {
        nama,
        bobot,
        minimum,
        keterangan,
      },
    })
    return res.status(201).json({ message: 'Kriteria berhasil dibuat' })
  } catch (error) {
    next(error)
  }
}
const updateKriteriaHandler = async (req, res, next) => {
  try {
    const { nama, bobot, minimum, keterangan } = req.body
    const { id } = req.params
    await db.kriteria.update({
      data: {
        nama,
        bobot,
        minimum,
        keterangan,
      },
      where: {
        id: Number(id),
      },
    })
    return res.status(201).json({ message: 'Kriteria berhasil diupdate' })
  } catch (error) {
    next(error)
  }
}
const deleteKriteriaHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    await db.kriteria.delete({
      where: {
        id: Number(id),
      },
    })
    return res.status(201).json({ message: 'Kriteria berhasil dihapus' })
  } catch (error) {
    next(error)
  }
}
const getKriteriaHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await db.kriteria.findFirst({
      where: {
        id: Number(id),
      },
    })
    return res.status(200).json({ data, message: 'Kriteria berhasil dihapus' })
  } catch (error) {
    next(error)
  }
}
const getAllKriteriaHandler = async (_, res, next) => {
  try {
    const data = await db.kriteria.findMany()
    return res.status(200).json({ data, message: 'Kriteria berhasil dihapus' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createKriteriaHandler,
  updateKriteriaHandler,
  deleteKriteriaHandler,
  getKriteriaHandler,
  getAllKriteriaHandler,
}
