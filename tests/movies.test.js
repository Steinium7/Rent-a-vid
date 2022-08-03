const app = require('../index');
const { Movie } = require('../models/movies');
const { Genre } = require('../models/genres');
const mongoose = require('mongoose');
const supertest = require('supertest');


beforeEach((done) => {
    mongoose.connect('mongodb://localhost:27017/JestDBM', () => done());
});

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done());
    });
});

test('GET /api/movies', async () => {             
    const genre = await Genre.create({ name: 'Action' });
    const movie = await Movie.create({ title: 'CR7 The movie', genre: genre });
    
    await supertest(app)
        .get('/api/movies/all')
        .expect(200)
        .then((response) => {
            // Check type and length
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toEqual(1);
            // Check data
            expect(response.body[0].title).toBe(movie.title);
            expect(response.body[0].genre).toBe(movie.genre);
        });
}, 30000);