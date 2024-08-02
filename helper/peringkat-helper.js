const db = require('../lib/db')

const getIdsHighestRank = async () => {
  const data = await db.hasil.findMany({
    select: {
      pegawai: {
        select: {
          id: true,
        },
      },
    },
    take: 10,
    orderBy: {
      nilai: 'desc',
    },
  })

  return data.map((d, index) => ({ id: d.pegawai.id, peringkat: index + 1 }))
}

module.exports = { getIdsHighestRank }
