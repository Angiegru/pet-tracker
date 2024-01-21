const petForm = document.querySelector('#petForm');

fetch('/getPets')
    .then((res) => res.json())
    .then((pets) => console.log(pets))
    //create a helper function -> render info to page(DOM Manipulation)
    // pass in the pets data into the function 

//helper function to create a card for each pet
const cardCreator = (obj) => {
    //console.log(obj.id)
    const card = document.createElement('li');
    card.id = obj.id;

    const petName = document.createElement('p');
    //petName.id = "Pet Name";
    petName.textContent = obj.pet_name;

    const cardImg = document.createElement('img');
    cardImg.src = obj.picture_url;

    const speciesName = document.createElement('p');
    //speciesName.id = "existingSpecies";
    speciesName.textContent = obj.species;

    const removeButton = document.createElement('button');
    removeButton.id = "remove";
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.addEventListener('click', () => {
        fetch(`/deletePets/${obj.id}`, {
            method: "DELETE"
        })
        .then(res => {
            if(res.ok) {
                card.remove();
            } else { console.error('Failed to delete pet:', response.status);
        }
    })
});

    card.append(petName);
    card.append(cardImg);
    card.append(speciesName);
    card.append(removeButton);
    return card
}

const listOfPets = document.querySelector('#listOfPets');

//pets is data that the fetch call returns
const loadPets = (data) => {
    listOfPets.innerHTML = "";
    data.forEach(pet => listOfPets.appendChild(cardCreator(pet)));
}

const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { pet_name, picture_url, species, is_friendly } = Object.fromEntries(formData);

    listOfPets.appendChild(cardCreator({ pet_name, picture_url, species, is_friendly }));


}
petForm.addEventListener('submit', handleSubmit);