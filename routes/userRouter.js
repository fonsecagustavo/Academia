const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/register',userController.register)
router.post('/payday', userController.payday)

router.delete('/delete', userController.delete)

module.exports = router