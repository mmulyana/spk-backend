const { Router } = require('express')
const {
  getAllPegawaiHandler,
  getPegawaiHandler,
  updatePegawaiHandler,
  deletePegawaiHandler,
  createPegawaiHandler,
} = require('../controller/pegawai.controller')

const router = Router()

router.post('/pegawai', createPegawaiHandler)
router.get('/pegawai', getAllPegawaiHandler)
router.get('/pegawai/:id', getPegawaiHandler)
router.patch('/pegawai/:id', updatePegawaiHandler)
router.delete('/pegawai/:id', deletePegawaiHandler)

module.exports = router
