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

test('GET /api/movies/all', async () => {             
    const genre = new Genre({ name: 'Action' });
    const movie = await Movie.create({ title: 'CR7Themovie', genre: genre });
    
    await supertest(app)
        .get('/api/movies')
        .expect(200)
        .then((response) => {
            // Check type and length
            
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toEqual(1);
            // Check data
            expect(response.body[0].title).toBe(movie.title);
            let testGenre = response.body[0].genre
            expect(testGenre[0]).toMatchObject({ name: 'Action' });
        });
}, 30000);