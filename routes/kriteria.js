const { Router } = require('express')

const router = Router()

router.post('/kriteria')
router.patch('/kriteria/:id')
router.delete('/kriteria/:id')
router.get('/kriteria/:id')
router.get('/kriteria')

module.exports = router
