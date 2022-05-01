const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const ObjectId = mongoose.Types.ObjectId
const {Genre, verify, _} = require('../models/genres')


router.get('/',async (req, res)=>{
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

//get a single genre by Id

router.post('/add',async (req, res)=>{
    const check = verify(req.body)
    if (check.error) return res.send(`Error : ${check['error']['details'][0]['message']}`)
    
    const genrefinal =  new Genre({
        name:req.body.name
    });
    try {
        const result = await genrefinal.save();
        res.send(result)
    } catch (error) {
        res.send(error.message)
    }

});

router.put('/update/:id',async (req, res)=>{
    const check = verify(req.body)
    if (check.error) return res.send(`Error : ${check['error']['details'][0]['message']}`)

    try {
        const newGenre = await Genre.findByIdAndUpdate(new ObjectId(req.params.id),req.body,{new:true});   
        if (!newGenre) return res.send('Genre Not Available!!');
        res.status(200).send('Done');     
    } catch (error) {
        console.log(error.message)
    }

});

router.delete('/delete/:id',async (req, res)=>{

    try {
        const old = await Genre.findByIdAndDelete(new ObjectId(req.params.id));
        if (!old) return res.send('Genre Not Available!!');
        res.send('Done').status(200)
    } catch (error) {
        console.log(error.message)
    }

});

module.exports = router;