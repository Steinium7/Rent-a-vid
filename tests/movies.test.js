const app = require('../index');
const { Movie } = require('../models/movies');
const { Genre } = require('../models/genres');
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
    mongoose.connect('mongodb://localhost:27017/JestDBM', () => done());
});

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done());
    });
});

describe('Model test', () => {
    it('GET /api/movies/all', async () => {
        const genre = new Genre({ name: 'Action' });
        const movie = await Movie.create({
            title: 'CR7Themovie',
            genre: genre,
        });

        if (movie) {
            await supertest(app)
                .get('/api/movies')
                .expect(200)
                .then((response) => {
                    expect(Array.isArray(response.body)).toBeTruthy();
                    expect(response.body.length).toEqual(1);
                    expect(response.body[0].title).toBe(movie.title);
                    let testGenre = response.body[0].genre;
                    expect(testGenre[0]).toMatchObject({ name: 'Action' });
                });
        }
    }, 30000);

    it('Post to add movies /api/movies/add', async () => {
        const genre = new Genre({ name: 'Action' });

        await supertest(app)
            .post('/api/movies/add')
            .send({ title: 'Kung-fu panda', genre: genre })
            .expect(200)
            .then((response) => {
                expect(response.body.title).toBe('Kung-fu panda');
            });
    });

    it('Update movie /api/movies/update/:id', async () => {
        const genre = new Genre({ name: 'Action' });
        const movie = await Movie.create({
            title: 'CR7Themovie',
            genre: genre,
        });

        if (movie) {
            await supertest(app)
                .put(`/api/movies/update/${String(movie._id)}`)
                .send({ title: 'TheloneRanger' })
                .expect(200)
                .then((response) => {
                    expect(response.body.title).toBe('TheloneRanger');
                });
        }
    });

    it('Update movie - Not Available', async () => {
        const id = new ObjectId();
        await supertest(app)
            .put(`/api/movies/update/${id}`)
            .send({ title: 'TheloneRanger' })
            .expect(404);
    });

    it('Delete movie /api/movies/delete/:id', async () => {
        const genre = new Genre({ name: 'Action' });
        const movie = await Movie.create({
            title: 'CR7Themovie',
            genre: genre,
        });

        if (movie) {
            await supertest(app)
                .delete(`/api/movies/delete/${String(movie._id)}`)
                .expect(200);
        }
    });

    it('Delete movie - Not Available', async () => {
        const id = new ObjectId();
        await supertest(app).delete(`/api/movies/delete/${id}`).expect(404);
    });
});
