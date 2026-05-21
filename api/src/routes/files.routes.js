/**
 * Routes for the files resource.
 *
 * Responsibilities:
 * - Map `/files/list` to the controller that proxies the remote list payload.
 * - Map `/files/data` to the controller that aggregates parsed CSV content.
 *
 * This router stays thin by design and contains no business logic.
 * @module routes/files
 */

const { Router } = require('express')
const filesController = require('../controllers/files.controller')

const router = Router()

router.get('/list', filesController.getFilesList)
router.get('/data', filesController.getFilesData)

module.exports = router
