const petForm = document.querySelector('#petForm');

fetch('/getPets')
    .then((res) => res.json())
    //instead of a console.log, use the helper function
    .then((pets) => console.log(pets))

    //create a helper function -> render info to page(DOM Manipulation)
    // pass in the pets data into the function 

//helper function
const cardCreator = (obj) => {
    const card = document.createElement('li');
    card.id = obj.id;

    const petName = document.createElement('p');
    petName.id = "Pet Name";
    petName.textContent = obj.pet_name;

    const cardImg = document.createElement('img');
    cardImg.src = obj.picture_url;

    const speciesName = document.createElement('p');
    speciesName.id = "existingSpecies";
    speciesName.textContent = obj.species;

    const removeButton = document.createElement('button');
    removeButton.id = "remove";
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.addEventListener('click', () => {
        card.remove();
    });

    card.append(petName);
    card.append(cardImg);
    card.append(speciesName);
    card.append(removeButton);
    return card
}
//pets is data that the fetch call returns
const listOfPets = document.querySelector('#listOfPets');

const loadPets = (data) => {
    listOfPets.innerHTML = "";
    data.forEach(pet => listOfPets.appendChild(cardCreator(pet)));
}

fetch('/getPets')
    .then((res) => res.json())
    //instead of a console.log, use the helper function
    .then((pets) => loadPets(pets))

const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const obj = Object.fromEntries(formData);
    fetch('/addPets', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
    .then(res => res.json())
    .then(data => listOfPets.appendChild(cardCreator(data)));

    // fetch('/addpets')
    //     .then(res => res.json())
    //     .then(data => console.log(data))}
}
petForm.addEventListener('submit', handleSubmit);