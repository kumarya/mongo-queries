const express = require("express")
const app = express()

const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const router = require("./router")


mongoose.connect('mongodb://info:zxc123@ds115411.mlab.com:15411/mongo')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

router(app)






app.listen(process.env.PORT, process.env.IP, ()=>{
    console.log('Server INIITAL')
})