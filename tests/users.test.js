const app = require('../index');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const supertest = require('supertest');
const config = require('config');
const { User, userSchema } = require('../models/users');

beforeEach((done) => {
    mongoose.connect('mongodb://localhost:27017/JestDBM', () => done());
});

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done());
    });
});


describe('user.generateUserToken', () => {
    it('should return a valid JWT', () => {
        jest.setTimeout(30000);
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin: true,
        };
        const user = new User(payload);
        const token = user.generateUserToken();
        const decoded = jwt.verify(token, config.get('jwtKey'));
        expect(decoded).toMatchObject(payload);
    },30000);
});

describe('get user', ()=>{
    it('should return the full user data if auth',async ()=>{
        const user = await User.create({name:"Sentinel Michael", email:"sen@gmail.com", isAdmin:true})
        const token = jwt.sign({_id:user._id, isAdmin:user.isAdmin}, '12345678')

        await supertest(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then((response) => {
            
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toEqual(1);
            expect(response.body[0].name).toBe(user.name);
        });
    },30000)

    it('should expect error code is not auth', async ()=>{
        const user = await User.create({name:"Sentinel Michael", email:"sen@gmail.com", isAdmin:true})
        const token = jwt.sign({_id:user._id, isAdmin:user.isAdmin}, '12345678')

        await supertest(app)
        .get('/api/users')
        .expect(401)
    })

});

describe('register user', ()=>{
    it('should return 409 is email exists', async ()=>{
        const user = await User.create({name:"Sentinel Michael", email:"sen@gmail.com", isAdmin:true})

        await supertest(app)
        .post('/api/users/register')
        .send({name:"Octane", email:'sen@gmail.com'})
        .expect(409)
    }, 30000)
});


describe('login user', ()=>{
    it('should return 400 for invalid email',()=>{
        const user = await User.create({name:"Sentinel Michael", email:"sen@gmail.com", isAdmin:true})

        await supertest(app)
        .post('/api/users/login')
        .send({password:"Gibby", email:'sentinel@gmail.com'})
        .expect(400)
    }, 30000)
})