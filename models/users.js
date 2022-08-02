const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
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
    password:String,
    isAdmin:Boolean
});

userSchema.methods.generateUserToken = function(){
    return jwt.sign({_id:this._id, isAdmin:this.isAdmin}, config.get('jwtKey'))
}

const User = mongoose.model('users', userSchema);


// to mod the custome validator for less transfer
function verify(data){
    const Schema = Joi.object({
        name:Joi.string().min(8),
        email:Joi.string().email().required(),
        password:Joi
                .string()
                .required()
                .custom((password, helpers)=>{
                    const check = passwordComplexity().validate(password);
                    if(check.value == 'password'){
                        return helpers.message(check.error.details);
                    }
                    else{
                        return true
                    }
                })
    });
    return Schema.validate(data);
}






module.exports = {User, verify};