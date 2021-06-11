require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const userRouter = require('./routes/userRouter')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
    }, (error)=> {
        if(error){
            console.log(error.message)
        }else{
            console.log("MongoDB connected")
        }
    }
)

app.set('views', path.join(__dirname, './public'))
app.set('view engine', 'ejs')

app.use('/',express.json(),userRouter)

app.listen(process.env.PORT, ()=> {
    console.log("Server ronning...")
})
