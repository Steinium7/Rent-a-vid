const mongoose = require('mongoose');
const Joi = require('joi');
const { required } = require('joi');

const User = mongoose.model('users', new mongoose.Schema({
    name:{
        type:String,
        minlength:7,
        maxlength:128,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:String
}));

function verify(data){
    const Schema = Joi.object({
        name:Joi.String().minlength(7),
        email:Joi.String().email().required(),
        password:Joi.String().required()
    })
}






module.exports = {User, verify};