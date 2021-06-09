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
            const saveUser = await user.save()
            res.send(saveUser)
        } catch (error) {
            res.status(400).send(error.message)
        }
    },
    payday: async function (req,res) {

        let payday = req.body.payday
        
        try {
            await User.updateOne({cpf: req.body.cpf}, {payday})
            res.send('Pagamento efetuado')
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
    }
}

module.exports = userControler
