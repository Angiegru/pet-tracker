//this is where our server is being hosted
const petHelper = require('./db/models/pets');
const path = require('path');
const express = require('express');
const app = express();
const PORT = 8089;
const controllers = require('./db/controllers/index');

const publicDir = path.join(__dirname, '..', 'public');
// here we are rendering the Static file 
const staticAssets = express.static(publicDir);
// Here we are using the static file with every request
app.use(staticAssets);


app.use(express.json())

//const pets = [];


app.get('/', (req, res) => {
    res.send("Hello World, this server is live").status(200);
});


app.get('/getPets', controllers.getPets);


//Create
app.post('/addPets', controllers.addPets);

app.delete('/deletePets:id', async (req, res) => {
    const {id} = req.params;
    const data = await petHelper.deletePets(id);
    const foundPet = pets.findIndex(pet => Number(id) === pet.id);
    pets.splice(foundPet, 1);
    console.log(id)
    res.send('deleted').status(200);
});

app.listen(PORT, () => {
    console.log('http://localhost:8089')
});