const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const genres = require('./routes/genres')
const home = require('./routes/home')
const customers = require('./routes/customers')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals')
const users = require('./routes/users')
const app = express()

if(!config.get('jwtKey')){
    console.log("ERROR, JWTKEY not set ...");
    process.exit(1);
}

mongoose.connect('mongodb://localhost/rent-a-vid')
    .then(()=>{console.log("Connected to Database....!!!!")})
    .catch((err)=>{console.log(err.message)})

app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/customers',customers)
app.use('/api/movies', movies)
app.use('/api/rentals', rentals)
app.use('/api/users',users)
app.use('/', home)

port  = process.env.PORT || 3000
app.listen(port, ()=>{console.log(`Listening on Port ${port}`)})