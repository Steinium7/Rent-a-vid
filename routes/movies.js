const express = require('express');
const mongoose  = require('mongoose');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const { update } = require('../models/movies');
const ObjectId = mongoose.Types.ObjectId
const { Movie } = require('../models/movies')

const router = express.Router();

router.get('/', async (req, res)=>{
    const movies = await Movie.find().sort('title')
    res.status(200).send(movies)
});

router.post('/add',[auth,admin], async (req, res)=>{
    // console.log(req.body)
    if(req.body=={}) return res.send('Data not sent...');

    try {
        // Can be modded to ease pressure on frontend.
        const movie = await new Movie(req.body);
        res.send(await movie.save());        
    } catch (error) {
        return res.send(error.message);
    }

});

router.put('/update/:id',[auth,admin] ,async (req, res)=>{
    if(!req.body.title&&!req.body.genre) return res.send('Data not sent...');

    try {
        const updatedMovie = await Movie.findByIdAndUpdate(new ObjectId(req.params.id),req.body, {new:true});
        if(!updatedMovie) return res.send('Movie not found');
        res.send(updatedMovie).status(200);
    } catch (error) {
        return res.send(error.message);
    }

});

router.delete('/delete/:id',[auth,admin], async (req, res)=>{
    try {
        const movie = await Movie.findByIdAndDelete(new ObjectId(req.params.id))
        if(!movie) return res.send('Movie not found');
        res.send(movie).status(200);
    } catch (error) {
        
    }
});


module.exports = router;
