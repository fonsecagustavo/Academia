const mongoose =require('mongoose')

const userSchema = mongoose.Schema({
    name: {type: String, required: true, minlength:3, maxlength: 50},
    cpf: {type: String, required:true, minlength:11, maxlength:11},
    phone: String,
    dateSubscription: {type: Date, default: Date.now},
    payday: {type: Date, default: Date.now}
})

module.exports = mongoose.model('User',userSchema)