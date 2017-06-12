const mongoose = require("mongoose")

const Schema = mongoose.Schema;


const postSchema = new Schema({
    
    content:String
})


module.exports = postSchema

