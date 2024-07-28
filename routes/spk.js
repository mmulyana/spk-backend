const { Router } = require('express')
const { spkHandler } = require('../controller/spk.controller')

const router = Router()

router.post('/spk', spkHandler)

module.exports = router
