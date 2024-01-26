const petHelper = require('../models/pet');

const addToPetList = async(req,res) => {
        const {pet_name, picture_url, species, is_friendly} = req.body;
        const data = await petHelper.addPets(pet_name, picture_url, species, is_friendly);
        console.log(data);
        res.send(data).status(200);
};

module.exports = addToPetList;
