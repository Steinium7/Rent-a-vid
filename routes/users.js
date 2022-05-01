const express = require('express');
const {User, verify, } = require('../models/users');
const router = express.Router();


router.post('/register', async (req, res)=>{
    const check = verify(req.body)
    if (check.error) return res.send(`Error : ${check['error']['details'][0]['message']}`)

    const user = await User(req.body);
    try {
        const user = await User(req.body);
        await user.save();
        res.send(user);
    } catch (error) {
        res.send(error.message)
    }

});

router.post('/login', async (req, res)=>{
    const check = verify(req.body)
    if (check.error) return res.send(`Error : ${check['error']['details'][0]['message']}`)

    const user = await User.find({email:req.body.email});
    // Implementation of login stuff ....

});



module.exports = router;