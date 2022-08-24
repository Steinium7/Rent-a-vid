const { rental, verify } = require('../models/rentals');
const Customer = require('../models/customers');
const Movie = require('../models/movies');
const express = require('express');
const mongoose = require('mongoose');
// const Fawn = require('fawn');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Fawn.init('mongodb://localhost/rent-a-vid'); To convert to mongo db implementation
// Fawn.init(mongoose);

const router = express.Router();

router.post('/', [auth, admin], async (req, res) => {
    const check = verify(req.body);
    if (!check)
        return res.status(400).send('Id not provided (customerId or movieId)');

    const customerData = await Customer.findById(
        new mongoose.Types.ObjectId(req.body.customerId)
    );
    if (!customerData) return res.send('CustomerId not sent');

    const movieData = await Movie.findById(
        new mongoose.Types.ObjectId(req.body.movieId)
    );
    if (!movieData) return res.send('movieId not sent');

    if (movieData.numberInStock == 0) return res.send('Movie is out of stock');

    const rented = new rental({
        customer: {
            _id: customerData._id,
            name: customerData.name,
            isGold: customerData.isGold,
            phone: customerData.phone,
        },
        movie: {
            _id: movieData._id,
            title: movieData.title,
            dailyRentalRate: movieData.dailyRentalRate,
        },
    });

    //transaction work around ------------
    // let result = await rented.save();

    // movie.numberInStock--;
    // movie.save();

    // -------------------------------
    // try {
    //     new Fawn.Task()
    //         .save('rentals', rented)
    //         .update('movies', {_id:movieData.id}, {$inc: { numberInStock: -1}})
    //         .run({useMongoose: true});
    //     res.send(rented)
    // } catch (error) {
    //     res.status(500).send("Internal Error")
    // }
});

router.get('/:id', [auth, admin], async (req, res) => {
    const rented = await rental.findById(
        new mongoose.Types.ObjectId(req.params.id)
    );
    if (rented == {}) return res.send('Rental not found');
    res.send(rented);
});

router.get('/', async (req, res) => {
    const rented = await rental.find();
    res.send(rented);
});

module.exports = router;
