const mongoose = require('mongoose');
const Joi = require('joi');

const rental = mongoose.model('rentals', new mongoose.Schema({

    customer:{
        type:new mongoose.Schema({
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
        }),
        required:true,
        minlength:4,
        maxlength:128
    },
    movie:{
        type: new mongoose.Schema({
            title:{
                type: String,
                required: true,
                minlength: 5,
                trim: true
            },
            dailyRentalRate:{
                type: Number,
                default: 0
            }
        }),
        required:true,

    },
    dateRented: {
        type:Date,
        default:Date.now
    },
    rentalFee:{
        type:Number,
        min:0
    },
    dateRenturned: Date,


}));

function verify(Data){

    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId:Joi.objectId().required()
    });

    return schema.validate(Data);

}

module.exports = {rental, verify};