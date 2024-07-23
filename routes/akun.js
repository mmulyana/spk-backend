const { Router } = require('express')

const router = Router()

router.post('/akun')
router.patch('/akun/:id')
router.delete('/akun/:id')
router.get('/akun/:id')
router.get('/akun')

module.exports = router
