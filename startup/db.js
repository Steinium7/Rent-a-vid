const winston = require('winston')
const mongoose =require('mongoose')

module.exports = function (){
    mongoose.connect('mongodb://localhost/rent-a-vid')
        .then(()=>winston.info('Connected to Database.'))
}