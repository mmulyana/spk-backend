const db = require('../lib/db')

const calculateSPK = async (idPegawai) => {
  const kriteria = await db.kriteria.findMany()

  const kriteriaArr = await Promise.all(
    kriteria.map(async (k) => {
      const data = await db.perhitungan.findMany({
        where: {
          idKriteria: k.id,
        },
        orderBy: {
          nilai: 'desc',
        },
      })

      return {
        idKriteria: k.id,
        name: k.nama,
        tipe: k.tipe,
        nilai:
          k.tipe === 'Benefit' ? data[0].nilai : data[data.length - 1].nilai,
        bobot: k.bobot,
      }
    })
  )

  const pegawai = await db.perhitungan.findMany({
    where: { idPegawai: idPegawai },
    select: {
      nilai: true,
      kriteria: {
        select: {
          id: true,
          nama: true,
        },
      },
    },
  })

  const normalized = kriteriaArr.map((k) => {
    const idx = pegawai.findIndex((p) => p.kriteria.id === k.idKriteria)
    if (k.tipe == 'Benefit') {
      return (pegawai[idx].nilai / k.nilai) * (k.bobot / 100)
    } else {
      return (k.nilai / pegawai[idx].nilai) * (k.bobot / 100)
    }
  })
  const nilai = normalized.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  )
  console.log(nilai)
}

module.exports = { calculateSPK }
