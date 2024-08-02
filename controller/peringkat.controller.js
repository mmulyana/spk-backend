const { getIdsHighestRank } = require('../helper/peringkat-helper')
const db = require('../lib/db')

const getPeringkatHandler = async (req, res, next) => {
  try {
    const { sort = 'desc', jabatan, jenis_kelamin, nama } = req.query
    const page = parseInt(req.query.page) || 1
    const limit = 20
    const skip = (page - 1) * limit
    const take = limit

    const filterByName = nama ? { nama: { contains: nama } } : undefined

    const query = {
      ...(filterByName ? filterByName : {}),
      ...(jenis_kelamin ? { jenis_kelamin } : {}),
      ...(jabatan ? { jabatan } : {}),
    }

    const data = await db.hasil.findMany({
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
      where: {
        pegawai: query,
      },
      orderBy: {
        nilai: sort,
      },
      take,
      skip,
    })

    const highest = await getIdsHighestRank()
    const rankingMap = highest.reduce((map, { id, peringkat }) => {
      map[id] = peringkat
      return map
    }, {})

    const payload = data.map((item) => {
      const id = item.pegawai.id
      return {
        ...item,
        peringkat: rankingMap[id] || null,
      }
    })

    const totalCount = await db.pegawai.count()

    return res.status(200).json({
      message: 'success',
      data: payload,
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

module.exports = { getPeringkatHandler }
