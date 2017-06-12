const mongoose = require("mongoose")


const Schema = mongoose.Schema

const albumSchema = new Schema({
    title:String,
    date:{type:Date, default:Date.now},
    copiesSold:Number,
    numberTracks:Number
    
})



module.exports = albumSchema