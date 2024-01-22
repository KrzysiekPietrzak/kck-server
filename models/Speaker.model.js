const mongoose = require('mongoose')

const Speaker = new mongoose.Schema({
    nameSurname: {type:String, required: true},
    affiliation: {type:String, required: false},
    title: {type:String, required: false},
    abstract: {type:String, max:200, required:false,},
    email: {type:String, required: false},
    phone: {type:Date, required:true},
},{
    collection:'speaker'}
    )


const model = mongoose.model('SpeakerData',Speaker)

module.exports = model