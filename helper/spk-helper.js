const db = require('../lib/db')

const calculateSPK = async (idPegawai) => {
  const kriteria = await db.kriteria.findMany()

  const kriteriaArr = await Promise.all(
    kriteria.map(async (k) => {
      const data = await db.perhitungan.findMany({
        where: {
          AND: [
            {
              idKriteria: k.id,
            },
          ],
        },
        orderBy: {
          nilai: k.tipe == 'Benefit' ? 'desc' : 'asc',
        },
        take: 1,
      })

      return {
        idKriteria: k.id,
        name: k.nama,
        tipe: k.tipe,
        nilai: data[0].nilai,
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
      return (pegawai[idx].nilai / k.nilai) * k.bobot
    } else {
      return (k.nilai / pegawai[idx].nilai) * k.bobot
    }
  })
  console.log('normalized', normalized)

  const nilai = normalized.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  )
  await db.hasil.create({
    data: {
      nilai,
      idPegawai,
    },
  })
}

const updateCalculateSPK = async (idPegawai, kriteriaArr) => {
  console.log('[UPDATE] idPegawai ' + idPegawai)
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
  console.log('[UPDATE] perhitungan pegawai', pegawai)

  const normalized = kriteriaArr.map((k) => {
    const idx = pegawai.findIndex((p) => p.kriteria.id === k.idKriteria)
    if (k.tipe == 'Benefit') {
      return (pegawai[idx].nilai / k.nilai) * k.bobot
    } else {
      return (k.nilai / pegawai[idx].nilai) * k.bobot
    }
  })
  console.log('[UPDATE] normalized', normalized)

  const nilai = normalized.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  )
  console.log('[UPDATE] nilai ' + nilai)
  const hasil = await db.hasil.findUnique({
    where: {
      idPegawai: idPegawai,
    },
  })

  if (hasil) {
    await db.hasil.update({
      where: {
        id: hasil.id,
      },
      data: {
        nilai: nilai,
      },
    })
  } else {
    console.log('Record not found')
  }
}

const reCalculateSPK = async (idPegawai) => {
  try {
    const pegawai = await db.pegawai.findMany({
      where: {
        AND: [
          {
            id: {
              not: idPegawai,
            },
          },
          {
            status: 'SUDAH',
          },
        ],
      },
    })

    const kriteria = await db.kriteria.findMany()

    const kriteriaArr = await Promise.all(
      kriteria.map(async (k) => {
        const data = await db.perhitungan.findMany({
          where: {
            AND: [
              {
                idKriteria: k.id,
              },
            ],
          },
          orderBy: {
            nilai: k.tipe == 'Benefit' ? 'desc' : 'asc',
          },
          take: 1,
        })

        return {
          idKriteria: k.id,
          name: k.nama,
          tipe: k.tipe,
          nilai: data[0].nilai,
          bobot: k.bobot,
        }
      })
    )

    for (const p of pegawai) {
      // console.log(p.id)
      await updateCalculateSPK(p.id, kriteriaArr)
    }
  } catch (error) {
    console.error('Error in reCalculateSPK:', error)
  }
}

module.exports = { calculateSPK, reCalculateSPK }
