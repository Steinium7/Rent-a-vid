const app = require('../index');
const { Genre, verify } = require('../models/genres');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const supertest = require('supertest');
jest.mock('../middleware/auth');
jest.mock('../middleware/admin');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

auth.mockImplementation((req, res, next) => next());
admin.mockImplementation((req, res, next) => next());

beforeEach((done) => {
    mongoose.connect('mongodb://localhost:27017/JestDBG', () => done());
});

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done());
    });
});

describe('Model test', () => {
    it('Verify function to throw is empty', () => {
        expect(verify({ name: '' })).toHaveProperty('value', { name: '' });
    });
});

describe('Genres routes test', () => {
    it('GET /api/genres', async () => {
        const genre = await Genre.create({ name: 'Action' });

        await supertest(app)
            .get('/api/genres')
            .expect(200)
            .then((response) => {
                // Check type and length
                expect(Array.isArray(response.body)).toBeTruthy();
                expect(response.body.length).toEqual(1);
                expect(response.body[0].name).toBe(genre.name);
            });
    }, 30000);

    it('Post to add genre /api/genres/add', async () => {
        await supertest(app)
            .post('/api/genres/add')
            .send({ name: 'Action' })
            .expect(200)
            .then((response) => {
                expect(response.body.name).toBe('Action');
            });
    });

    it('Update genre /api/genres/update/:id', async () => {
        const genre = await Genre.create({ name: 'Action' });

        if (genre) {
            await supertest(app)
                .put(`/api/genres/update/${String(genre._id)}`)
                .send({ name: 'Action+' })
                .expect(200)
                .then((response) => {
                    expect(response.body.name).toBe('Action+');
                });
        }
    });

    it('Update genre - Not Available', async () => {
        const id = new ObjectId();
        await supertest(app)
            .put(`/api/genres/update/${id}`)
            .send({ name: 'Go' })
            .expect(404);
    });

    it('Delete genre /api/genres/delete/:id', async () => {
        const genre = await Genre.create({ name: 'Action' });

        if (genre) {
            await supertest(app)
                .delete(`/api/genres/delete/${String(genre._id)}`)
                .expect(200);
        }
    });

    it('Delete genre - Not Available', async () => {
        const id = new ObjectId();
        await supertest(app).delete(`/api/genres/delete/${id}`).expect(404);
    });
});
