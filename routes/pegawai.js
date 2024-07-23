const { Router } = require('express')
const {
  createPegawai,
  getAllPegawaiHandler,
  getPegawaiHandler,
  updatePegawaiHandler,
  deletePegawaiHandler,
} = require('../controller/pegawai.controller')

const router = Router()

router.post('/pegawai', createPegawai)
router.get('/pegawai', getAllPegawaiHandler)
router.get('/pegawai/:id', getPegawaiHandler)
router.patch('/pegawai/:id', updatePegawaiHandler)
router.delete('/pegawai/:id', deletePegawaiHandler)

module.exports = router
