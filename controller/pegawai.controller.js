const { reCalculateSPK } = require('../helper/spk-helper')
const db = require('../lib/db')

const createPegawaiHandler = async (req, res, next) => {
  try {
    const {
      nama,
      NIP,
      tempat_lahir,
      tanggal_lahir,
      jenis_kelamin,
      agama,
      alamat,
      pendidikan_terakhir,
      status_pegawai,
      departemen,
      jabatan,
    } = req.body

    const data = await db.pegawai.create({
      data: {
        nama,
        NIP,
        tempat_lahir,
        tanggal_lahir: tanggal_lahir
          ? new Date(tanggal_lahir).toISOString()
          : new Date().toISOString(),
        jenis_kelamin,
        agama,
        alamat,
        pendidikan_terakhir,
        status_pegawai,
        departemen,
        jabatan,
      },
    })

    return res
      .status(201)
      .json({ message: 'Pegawai berhasil dibuat', data: { id: data.id } })
  } catch (error) {
    next(error)
  }
}
const updatePegawaiHandler = async (req, res, next) => {
  try {
    const {
      nama,
      NIP,
      tempat_lahir,
      tanggal_lahir,
      jenis_kelamin,
      agama,
      alamt,
      pendidikan_terakhir,
      status_pegawai,
      departemen,
      jabatan,
    } = req.body
    const { id } = req.params

    await db.pegawai.update({
      data: {
        nama,
        NIP,
        tempat_lahir,
        tanggal_lahir: new Date(tanggal_lahir).toISOString(),
        jenis_kelamin,
        agama,
        alamt,
        pendidikan_terakhir,
        status_pegawai,
        departemen,
        jabatan,
      },
      where: {
        id: Number(id),
      },
    })

    return res.status(201).json({ message: 'Pegawai berhasil diupdate' })
  } catch (error) {
    next(error)
  }
}
const deletePegawaiHandler = async (req, res, next) => {
  try {
    const { id } = req.params

    const pegawai = await db.pegawai.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        hasil: {
          select: {
            id: true,
            nilai: true,
          },
        },
        perhitungan: {
          select: {
            id: true,
            nilai: true,
          },
        },
      },
    })
    const hasil = pegawai.hasil
    const perhitungan = pegawai.Perhitungan.map((p) => p.id)
    if (hasil.length > 0) {
      await db.hasil.delete({
        where: {
          id: hasil[0].id,
        },
      })
    }
    if (perhitungan.length > 0) {
      await db.perhitungan.deleteMany({
        where: {
          id: {
            in: perhitungan,
          },
        },
      })
    }
    reCalculateSPK(Number(id))
    await db.pegawai.delete({
      where: {
        id: Number(id),
      },
    })

    return res.status(201).json({
      message: 'pegawai berhasil dihapus',
    })
  } catch (error) {
    next(error)
  }
}

const getPegawaiHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const pegawai = await db.pegawai.findFirst({
      where: {
        id: Number(id),
      },
    })
    return res.status(200).json({
      message: 'success',
      data: pegawai,
    })
  } catch (error) {
    next(error)
  }
}
const getAllPegawaiHandler = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = 10
    const skip = (page - 1) * limit
    const take = limit

    const pegawai = await db.pegawai.findMany({
      include: {
        hasil: {
          select: {
            nilai: true,
          },
        },
        perhitungan: {
          select: {
            id: true,
            nilai: true,
          },
        },
      },
      skip,
      take,
    })

    const totalCount = await db.pegawai.count()

    return res.status(200).json({
      message: 'success',
      data: pegawai,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalCount: totalCount,
        perPage: limit,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createPegawaiHandler,
  updatePegawaiHandler,
  deletePegawaiHandler,
  getPegawaiHandler,
  getAllPegawaiHandler,
}
