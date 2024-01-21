//this is where our server is being hosted
const petHelper = require('./db/models/pets');
const path = require('path');
const express = require('express');
const app = express();
const PORT = 8089;

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


app.get('/getPets', async(req, res) => {
    const data = await petHelper.getAllPets();
    console.log(data);
    res.send(data).status(200);
});


//Create
app.post('/addPets', async(req,res) => {
    console.log(req.body, "Testing addpets");
    try {
        const {pet_name, picture_url, species, is_friendly} = req.body;
        const currPet = {
            pet_name, picture_url, species, is_friendly
        }
        pets.push(currPet);
        res.send(currPet).status(200);
    }catch(err){
        res.send(err).status(404);
    }
})

app.delete('/deletepets:id', async (req, res) => {
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