const { Router } = require('express')
const healthRoutes = require('./health')
const filesRoutes = require('./files.routes')

const router = Router()

router.use(healthRoutes)
router.use('/files', filesRoutes)

module.exports = router
