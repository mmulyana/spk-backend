const { Router } = require('express')
const { dashboardHandler } = require('../controller/dashboard.controller')
const router = Router()

router.get('/dashboard', dashboardHandler)

module.exports = router
