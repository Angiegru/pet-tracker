const petForm = document.querySelector('#pet-form');

fetch('/getPets')
    .then((res) => res.json())
    .then((pets) => console.log(pets))

const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);

    const formData = new FormData(e.target);
    const obj = Object.fromEntries(formData);
    fetch('/addpets', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
    .then(res => res.json())
    .then(data => console.log(data));

    // fetch('/addpets')
    //     .then(res => res.json())
    //     .then(data => console.log(data))}
}