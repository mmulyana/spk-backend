const { Router } = require('express')
const { getPeringkatHandler } = require('../controller/peringkat.controller')

const router = Router()

router.get('/peringkat', getPeringkatHandler)

module.exports = router
