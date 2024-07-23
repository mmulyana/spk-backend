const { Router } = require('express')

const router = Router()

router.get('/dashboard/data')
router.get('/dashboard/akun')
router.get('/dashboard/pegawai')

module.exports = router
