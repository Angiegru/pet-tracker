const petHelper = require('../models/pets') ; 
//or you can import `getPets` and delete `petHelper` in `getPetList`


const getPetList = async(req, res) => {
    const data = await petHelper.getPets();
    console.log(data);
    res.send(data).status(200);
};

module.exports = getPetList;