const express = require('express');
const config = require('config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User, verify} = require('../models/users');
const router = express.Router();



router.post('/register', async (req, res)=>{
    const check = verify(req.body);
    if (check.error) return res.send(`Error : ${check['error']['details'][0]['message']}`);

    try {
        let user = await User.findOne({email:req.body.email});
        if (user) return res.send("User already Exists!!!");

        user = new User(_.pick(req.body, ['name','email','password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();
        res.send(_.pick(user, ['name','email']));
    } catch (error) {
        res.send(error.message)
    }

});

router.post('/login', async (req, res)=>{
    const check = verify(req.body)
    if (check.error) return res.send(`Error : ${check['error']['details'][0]['message']}`);

    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send("Invalid Email or Password");
    

    const pwdCheck =await bcrypt.compare(req.body.password, user.password);
    if (!pwdCheck) return res.status(400).send("Invalid Email or Password");
    console.log(pwdCheck);
    const token = jwt.sign({_id:user._id}, config.get('jwtKey'))
    res.send(token);

});



module.exports = router;