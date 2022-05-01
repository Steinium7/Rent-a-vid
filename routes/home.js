const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    res.send("<h1 style='text-center'>Rent-a-vid</h1>")
});

module.exports = router;