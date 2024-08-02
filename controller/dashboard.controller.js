const db = require('../lib/db')

const dashboardHandler = async (req, res, next) => {
  try {
    const kriteria = await db.kriteria.findMany()
    const dataHasil = await db.hasil.findMany({
      select: {
        nilai: true,
        pegawai: {
          select: {
            id: true,
            nama: true,
            NIP: true,
            jabatan: true,
          },
        },
      },
      take: 10,
      orderBy: {
        nilai: 'desc',
      },
    })
    const pegawai = dataHasil.map((item, index) => {
      return {
        ...item,
        peringkat: index + 1,
      }
    })

    const akun = await db.akun.count()
    const totalPegawai = await db.pegawai.count()
    const nilai = await db.hasil.count()
    const totalKriteria = await db.kriteria.count()

    return res.status(200).json({
      message: 'success',
      data: {
        count: {
          akun,
          nilai,
          kriteria: totalKriteria,
          pegawai: totalPegawai,
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
