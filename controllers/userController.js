const format = require('date-fns/format')
const ptBR = require('date-fns/locale/pt-BR')
const User = require('../models/User')

const {registerValidate, registerPayday} = require('./validate')

const userControler = {
    register: async function (req,res) {
        const {error} = registerValidate(req.body)
        if(error){
            return res.status(400).send(error.message)
        }

        const selectedUser = await User.findOne({cpf: req.body.cpf})
        if(selectedUser){
            return res.status(400).send('Usuario ja existente')
        }

        const user = new User({
            name: req.body.name,
            cpf: req.body.cpf,
            phone: req.body.phone,
            payday: req.body.payday
        })

        try {
            await user.save()
            res.redirect('/')
        } catch (error) {
            res.status(400).send(error.message)
        }
    },
    payday: async function (req,res) {
        const {error} = registerPayday(req.body)
        if(error){
            return res.status(400).send(error.message)
        }

        let payday = req.body.payday
        let id = req.body.id
        console.log(id,payday)
        try {
            await User.findByIdAndUpdate({_id:id}, {payday})
            res.redirect('/')
        } catch (error) {
            res.status(400).send(error.message)
        }

        
    },
    delete: async function (req,res) {
        try {
            const selectedUser = await User.findOneAndDelete({cpf: req.body.cpf})
            res.send(selectedUser)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    allUsers: async function (req,res) {
        try {
            let docs = await User.find({})
            console.log(docs)
            res.render('index',{users: docs})
        } catch (error) {
            res.status(400).send(error.message)
        }
    },
    viewUser: async function (req,res) {
        let id = req.params.id
        if(!id) {
            id = req.body.id
        }

        try {
            let doc = await User.findById(id)
            res.render('user', {error:false, user: doc})
        }catch(error){
            res.status(400).send(error.message)
        }
    },search: async function (req,res) {
        let cpf = req.body.cpf

        try {
            let doc = await User.findOne({cpf})
            res.render('payday', {user:doc})
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}

module.exports = userControler

