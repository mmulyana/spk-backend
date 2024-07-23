const { Router } = require('express')
const {
  createAkunHandler,
  updateAkunHandler,
  deleteAkunHandler,
  getAkunHandler,
  getAllAkunHandler,
} = require('../controller/akun.controller')

const router = Router()

router.post('/akun', createAkunHandler)
router.patch('/akun/:id', updateAkunHandler)
router.delete('/akun/:id', deleteAkunHandler)
router.get('/akun/:id', getAkunHandler)
router.get('/akun', getAllAkunHandler)

module.exports = router
