const dogTable = document.body.querySelector('#table-body')
const submitButton = document.querySelector('input[type="submit"]')
const dogIDField = document.querySelector('input[name="dogID"]')
const dogNameField = document.querySelector('input[name="name"]')
const dogBreedField = document.querySelector('input[name="breed"]')
const dogSexField = document.querySelector('input[name="sex"]')
let selectedDog;

const render = () => {

  fetch('http://localhost:3000/dogs')
  .then(function(response) {
    return response.json()
  })
  .then (function(dogs) {

    dogs.forEach(function(dog) {
      let dogTR = document.createElement('tr')
      let dogName = document.createElement('td')
      dogName.innerText = `${dog.name}`
      dogTR.append(dogName)

      let dogBreed = document.createElement('td')
      dogBreed.innerText = `${dog.breed}`
      dogTR.append(dogBreed)

      let dogSex = document.createElement('td')
      dogSex.innerText = `${dog.sex}`
      dogTR.append(dogSex)

      let editDogTD = document.createElement('td')
      let editDogButton = document.createElement('button')
      editDogButton.innerText = 'Edit Dog'
      editDogButton.style.width = '150px'
      editDogTD.append(editDogButton)
      dogTR.append(editDogTD)

      dogTable.append(dogTR)

      editDogButton.addEventListener('click', function() {
        selectedDog = dog
        dogNameField.value = dogName.innerText // maybe go back to dog.name
        dogBreedField.value = dogBreed.innerText
        dogSexField.value = dogSex.innerText
      })

    })// outside forEach loop, still inside render()
  }) // end of fetch
} // end of render()

submitButton.addEventListener('click', function(e) {
  editDB(selectedDog);
})

const editDB = (selectedDog) => {
  console.log(selectedDog.id)
  fetch(`http://localhost:3000/dogs/${selectedDog.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      name: dogNameField.value,
      breed: dogBreedField.value,
      sex: dogSexField.value
    })
  })
  dogNameField.value = ''
  dogBreedField.value = ''
  dogSexField.value = ''
  render();
}

render();
