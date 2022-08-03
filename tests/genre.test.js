const app = require('../index');
const { Genre } = require('../models/genres');
const mongoose = require('mongoose');
const supertest = require('supertest');


beforeEach((done) => {
    mongoose.connect('mongodb://localhost:27017/JestDBG', () => done());
});

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done());
    });
});

test('GET /api/genres', async () => {
    const genre = await Genre.create({ name: 'Action' });

    await supertest(app)
        .get('/api/genres')
        .expect(200)
        .then((response) => {
            // Check type and length
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toEqual(1);
            // Check data
            expect(response.body[0].name).toBe(genre.name);
        });
}, 30000);


