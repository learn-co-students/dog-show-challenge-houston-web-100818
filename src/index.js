// document.addEventListener("DOMContentLoaded", () => {});

const dogTable = document.getElementById("table-body");
const dogForm = document.getElementById("dog-form");
const submitButton = document.querySelector("#dog-form input[type='submit']");
let dogs = [];

fetch("http://localhost:3000/dogs")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    dogs = data;
    render();
  });

submitButton.addEventListener("click", function(e) {
  dog = {
    id: dogForm.querySelector("input[name='id']").value,
    name: dogForm.querySelector("input[name='name']").value,
    breed: dogForm.querySelector("input[name='breed']").value,
    sex: dogForm.querySelector("input[name='sex']").value
  };
  dogPatch(dog);
});

function dogPatch(dog) {
  fetch(`http://localhost:3000/dogs/${dog.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dog)
  }).then(render);
}

function render() {
  dogs.forEach(function(dog) {
    let dogLine = document.createElement("tr");
    let name = document.createElement("td");
    name.innerText = dog.name;

    let breed = document.createElement("td");
    breed.innerText = dog.breed;

    let sex = document.createElement("td");
    sex.innerText = dog.sex;

    let editButtonHTML = document.createElement("td");
    let editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButtonHTML.append(editButton);

    dogLine.append(name, breed, sex, editButton);
    dogTable.append(dogLine);

    editButton.addEventListener("click", function(e) {
      dogForm.querySelector("input[name='name']").value = dog.name;
      dogForm.querySelector("input[name='breed']").value = dog.breed;
      dogForm.querySelector("input[name='sex']").value = dog.sex;
      dogForm.querySelector("input[name='id']").value = dog.id;
    });
  });
}
