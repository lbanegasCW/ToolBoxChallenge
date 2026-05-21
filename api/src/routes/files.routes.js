const { Router } = require('express')
const filesController = require('../controllers/files.controller')

const router = Router()

router.get('/data', filesController.getFilesData)

module.exports = router
