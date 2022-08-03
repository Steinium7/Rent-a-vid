const app = require('../../index');
const {Genre,_,b} = require('../../models/genres');
const mongoose = require('mongoose');
const supertest = require('supertest');

beforeEach((done) => {
    mongoose.connect(
        'mongodb://localhost:27017/JestDB',
        () => done()
    );
});

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done());
    });
});

test('GET /api/genres', async () => {
    const genre = await Genre.create({ name: "Action"});
    console.log(genre)
});

it('First Test', () => {});
