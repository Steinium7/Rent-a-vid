const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, verify, userSchema } = require('../models/users');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/get', auth, async (req, res) => {
    const user = await User.findById(
        new mongoose.Types.ObjectId(req.user._id)
    ).select('-password');
    res.status(200).send(user);
});

router.post('/register', async (req, res) => {
    const check = verify(req.body);
    if (check.error)
        return res.send(`Error : ${check['error']['details'][0]['message']}`);

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(409).send('User already Exists!!!');

        user = new User(_.pick(req.body, ['name', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const token = user.generateUserToken();
        res.header('x-auth-token', token)
            .status(200)
            .send(_.pick(user, ['name', 'email']));
    } catch (error) {
        res.send(error.message);
    }
});

router.post('/login', async (req, res) => {
    const check = verify(req.body);
    if (check.error)
        return res.send(`Error : ${check['error']['details'][0]['message']}`);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid Email or Password');

    const pwdCheck = await bcrypt.compare(req.body.password, user.password);
    if (!pwdCheck) return res.status(400).send('Invalid Email or Password');

    const token = user.generateUserToken();
    res.send(token);
});

module.exports = router;
