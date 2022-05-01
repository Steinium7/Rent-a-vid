const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name:{type: String, required:true}
})

const Genre = mongoose.model('genres', genreSchema)

const verify =(genre)=>{
    const schema = Joi.object({
        name: Joi.string().required()
    });

    return schema.validate(genre)
}

module.exports.Genre = Genre;
module.exports.verify = verify;
module.exports.genreSchema = genreSchema;