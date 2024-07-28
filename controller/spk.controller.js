const db = require('../lib/db')

const spkHandler = async (req, res, next) => {
  try {
    const { id, kriteria } = req.body
    const transformedArray = Object.entries(kriteria).map(([key, value]) => ({
      id: Number(key),
      value: value,
    }))

    await db.perhitungan.createMany({
      data: transformedArray.map((d) => ({
        idKriteria: d.id,
        nilai: d.value,
        idPegawai: id,
      })),
    })

    await db.pegawai.update({
      data: {
        status: 'SUDAH',
      },
      where: {
        id,
      },
    })

    return res.status(201).json({ message: 'Pegawai berhasil dihitung' })
  } catch (error) {
    next(error)
  }
}

module.exports = { spkHandler }
