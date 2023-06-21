const express = require('express')
const router = express.Router()

const command = require('../middleware/command.js')

router.post('/', command.run)

module.exports = router