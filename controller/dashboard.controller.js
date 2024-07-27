const db = require('../lib/db')

const dashboardHandler = async (req, res, next) => {
  try {
    const akun = await db.akun.findMany()
    const kriteria = await db.kriteria.findMany()
    const pegawai = await db.pegawai.findMany({
      include: {
        Hasil: {
          select: {
            nilai: true,
          },
        },
      },
    })

    return res.status(200).json({
      message: 'success',
      data: {
        count: {
          pegawai: pegawai.length,
          sudah: 0,
          kriteria: kriteria.length,
          akun: akun.length,
        },
        pegawai,
        kriteria,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { dashboardHandler }
