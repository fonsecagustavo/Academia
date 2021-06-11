const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const cors = require('cors')

const options = {
    origin: "http://localhost:3000"
}



router.use(cors(options))

router.get('/', userController.allUsers)
router.get('/register', (req,res)=> {res.render('register',{error: false})})
router.get('/user/:id',express.urlencoded({extended: true}),userController.viewUser)
router.get('/payday',(req,res)=> {res.render('payday',{error: false, user: null})})

router.post('/register',express.urlencoded({extended: true}),userController.register)
router.post('/payday', express.urlencoded({extended: true}),userController.payday)
router.post('/search', express.urlencoded({extended: true}), userController.search)

router.delete('/delete', userController.delete)

module.exports = router