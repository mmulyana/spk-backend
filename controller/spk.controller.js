const { calculateSPK, reCalculateSPK } = require('../helper/spk-helper')
const db = require('../lib/db')
const { hasData } = require('../utils/has-data')

const spkHandler = async (req, res, next) => {
  try {
    const { id, values } = req.body

    await db.perhitungan.createMany({
      data: values.map((d) => ({
        idKriteria: d.id,
        nilai: d.nilai,
        idPegawai: id,
      })),
    })

    await calculateSPK(id)

    const existingData = await Promise.all(
      values.map(async (k) => {
        return await db.perhitungan.findMany({
          where: {
            AND: [
              {
                idKriteria: k.id,
              },
              {
                nilai: k.tipe == 'Benefit' ? { lt: k.nilai } : { gt: k.nilai },
              },
            ],
          },
          take: 1,
        })
      })
    )

    const isCalculateChanged = hasData(existingData)
    if (isCalculateChanged) {
      reCalculateSPK(id)
    }

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
