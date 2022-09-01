const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;
const { Genre, verify, _ } = require('../models/genres');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/async');

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    return res.status(200).send(genres);
});

//get a single genre by Id

router.post('/add', [auth, admin], async (req, res) => {
    const check = verify(req.body);
    if (check.error)
        return res.send(`Error : ${check['error']['details'][0]['message']}`);

    const genrefinal = new Genre({
        name: req.body.name,
    });
    try {
        const result = await genrefinal.save();
        res.status(200).send(result);
    } catch (error) {
        res.send(error.message);
    }
});

router.put('/update/:id', [auth, admin], async (req, res) => {
    const check = verify(req.body);
    if (check.error)
        return res
            .status(500)
            .send(`Error : ${check['error']['details'][0]['message']}`);

    try {
        const newGenre = await Genre.findByIdAndUpdate(
            new ObjectId(req.params.id),
            req.body,
            { new: true }
        );
        if (!newGenre) return res.status(404).send('Genre Not Available!!');
        res.status(200).send(newGenre);
    } catch (error) {
        console.log(error.message);
        res.status(500);
    }
});

router.delete('/delete/:id', [auth, admin], async (req, res) => {
    try {
        const old = await Genre.findByIdAndDelete(new ObjectId(req.params.id));
        if (!old) return res.status(404).send('Genre Not Available!!');
        res.send('Done').status(200);
    } catch (error) {
        console.log(error.message);
        res.status(500);
    }
});

module.exports = router;
