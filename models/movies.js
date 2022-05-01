const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    _id:{type:mongoose.Types.ObjectId, required:true},
    name:{type: String, required:true}
})

const Movie = mongoose.model('movies', new mongoose.Schema({

    title:{
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    genre:{
        type:[genreSchema],
        required:true
    },
    numberInStock:{
        type: Number,
        default: 0
    },
    dailyRentalRate:{
        type: Number,
        default: 0
    }

}));

module.exports = Movie;