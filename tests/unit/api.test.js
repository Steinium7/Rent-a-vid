const app = require('../../index');
const { User, userSchema } = require('../../models/users');
const { Genre } = require('../../models/genres');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const supertest = require('supertest');

beforeEach((done) => {
    mongoose.connect('mongodb://localhost:27017/JestDB', () => done());
});

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done());
    });
});

test('GET /api/genres', async () => {
    const genre = await Genre.create({ name: 'Action' });
    console.log(genre);
});

describe('user.generateUserToken', () => {
    it('should return a valid JWT', () => {
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin: true,
        };
        const user = new User(payload);
        const token = user.generateUserToken();
        const decoded = jwt.verify(token, config.get('jwtKey'));
        expect(decoded).toMatchObject(payload);
    });
});
