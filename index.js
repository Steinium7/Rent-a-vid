const express = require('express')
const Joi = require('joi')
const app = express()

app.use(express.json())

genres = []


app.get('/', (req, res)=>{
    res.send("<h1 style='text-center'>Rent-a-vid</h1>")
});

app.get('/api/genres', (req, res)=>{
    res.send(genres);
});

app.post('/api/genres/add', (req, res)=>{
    genres.push(req.body.name)
    res.send(genres)
});

app.put('/api/genres/update', (req, res)=>{
    const old = genres.indexOf(req.body.nameOld)
    // console.log(old)
    // console.log(req.body.nameOld)
    if (!JSON.stringify(old)) return res.send('Genre Not Available!!')

    genres.splice(old,1,req.body.name)
    res.send('Done').status(200)

});

app.delete('/api/genres/delete', (req, res)=>{
    const old = genres.indexOf(req.body.nameOld)
    if (!JSON.stringify(old)) return res.send('Genre Not Available!!')

    genres.splice(old, 1)
    res.send('Done').status(200)
});

app.listen(3000, ()=>{console.log('Listening on Port 3000')})