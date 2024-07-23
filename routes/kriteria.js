const { Router } = require('express')
const {
  createKriteriaHandler,
  updateKriteriaHandler,
  deleteKriteriaHandler,
  getKriteriaHandler,
  getAllKriteriaHandler,
} = require('../controller/kriteria.controller')

const router = Router()

router.post('/kriteria', createKriteriaHandler)
router.patch('/kriteria/:id', updateKriteriaHandler)
router.delete('/kriteria/:id', deleteKriteriaHandler)
router.get('/kriteria/:id', getKriteriaHandler)
router.get('/kriteria', getAllKriteriaHandler)

module.exports = router
