// const Joi = require('joi')
const mongoose = require('mongoose')

const Customer = mongoose.model('customers', new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength:5 
        },
    isGold:{
        type:Boolean, 
        default:false,
        },
    phone:{
        type:String,
        minlength:10,
        maxlength:14,
        required:true, 
        }

}));

module.exports = Customer;
