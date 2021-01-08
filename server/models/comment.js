const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const Comment = new Schema({
    user_id:{type: Schema.Types.ObjectId, required:true, ref:'User'},
    post_id:{type: Schema.Types.ObjectId, required:true, ref:'post'},
    content:{type:String, required:true},
    createdAt:{type:Date, default: moment(Date.now()).toLocaleString({timeZone:"America/Sao_Paulo"})}
})

module.exports = mongoose.model('comment', Comment);