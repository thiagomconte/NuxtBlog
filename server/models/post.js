const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const moment = require('moment')

const Post = new Schema({
    title:{type:String, require:true},
    description:{type:String, require:true},
    slug:{type:String, require:true, unique: true},
    content:{type:String, require:true},
    img:{type:String, require:true},
    imgOwner:{type:String, require:true},
    createdAt:{type:Date, default:moment(Date.now()).toLocaleString({timeZone:"America/Sao_Paulo"})}
})

module.exports = mongoose.model('post',Post);