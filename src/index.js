//this is where our server is being hosted
const petHelper = require('./db/models/pets');
const path = require('path');
const express = require('express');
const app = express();
const PORT = 8089;
// const Pets = re

const publicDir = path.join(__dirname, '..', 'public');
// here we are rendering the Static file 
const staticAssets = express.static(publicDir);
// Here we are using the static file with every request
app.use(staticAssets);


app.use(express.json())

const pets = [];


app.get('/test', (req, res) => {
    console.log("hello?")
    res.send("Hello world!").status(200);
});

// app.get('/getpets', async (req, res) => {
//     res.send(pets).status(200);
// });

app.get('/getPets', async(req, res) => {
    const data = await petHelper.getAllPets();
    console.log(data, "hello ? ");
    res.send(data).status(200);
});


//Create
app.post('/addpets', (req,res) => {
    try {
        const {name, picture, species, isFriendly} = req.body;
        const currPet = {
            name, picture, species, isFriendly
        }
        pets.push(currPet);
        res.send(currPet).status(200);
    }catch(err){
        res.send(err).status(404);
    }
})

app.listen(PORT, () => {
    console.log('http://localhost:8089')
});