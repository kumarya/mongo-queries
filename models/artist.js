const mongoose = require("mongoose")
const albumSchema = require("./album")

const Schema = mongoose.Schema

const artistSchema = new Schema({
    name:{
        type:String,
        unique:true
        
    },
    
    age:{
        type:Number
    },
    albums:[albumSchema]
    
    
})


const Artist = mongoose.model('Artist', artistSchema)

module.exports = Artist