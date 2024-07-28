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
        tanggal_lahir: new Date(tanggal_lahir).toISOString(),
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
    const pegawai = await db.pegawai.findMany({
      include: {
        Hasil: {
          select: {
            nilai: true,
          },
        },
        Perhitungan: {
          select: {
            nilai: true,
          },
        },
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

module.exports = {
  createPegawaiHandler,
  updatePegawaiHandler,
  deletePegawaiHandler,
  getPegawaiHandler,
  getAllPegawaiHandler,
}
