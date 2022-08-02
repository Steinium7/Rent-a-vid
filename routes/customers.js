const express = require('express')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const Customer = require('../models/customers')
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();


// Joi to be implemented

router.get('/all',[auth,admin],async (req, res)=>{
    res.send(await Customer.find().sort('name'));
});

router.post('/add',[auth,admin], async (req, res)=> {
    // console.log(req.body)
    if(req.body == {}) return res.send("No data sent .................");

    // Joi implementation
    try {
        let result = new Customer(req.body)
        res.send(await result.save())
    } catch (error) {
        return res.send(error.message)
    }
});

router.put('/update/:id',[auth,admin],async (req, res)=>{
    try {
        let result = await Customer.findByIdAndUpdate(new ObjectId(req.params.id), req.body, {new:true})
        if(!result) return res.send("Customer not found") 
        return res.status(200).send('Done')
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
});

router.delete('/delete/:id',[auth,admin],async (req, res)=>{
    try {
        let result = await Customer.findByIdAndDelete(new ObjectId(req.params.id))
        if(!result) return res.send("Customer not found") 
        return res.status(200).send('Done')
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
});


module.exports = router;