const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('config');
const { User, userSchema } = require('../models/users');


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
    });
});

