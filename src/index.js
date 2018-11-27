fetch('http://localhost:3000/dogs')
  .then(function(response) {
    return response.json()
  })
  .then (function(dogs) {
    render(dogs)
  })

const dogTable = document.body.querySelector('#table-body')
const submitButton = document.querySelector('input[type="submit"]')
const dogNameField = document.querySelector('input[name="name"]')
const dogBreedField = document.querySelector('input[name="breed"]')
const dogSexField = document.querySelector('input[name="sex"]')

const render = (dogs) => {
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
    editDogButton.innerText = `Edit ${dog.name}`
    editDogButton.style.width = '150px'
    editDogTD.append(editDogButton)
    dogTR.append(editDogTD)

    dogTable.append(dogTR)

    editDogButton.addEventListener('click', function() {
      dogNameField.value = dog.name
      dogBreedField.value = dog.breed
      dogSexField.value = dog.sex

      submitButton.addEventListener('click', function(e) {
        e.preventDefault()
        dogName.innerText = dogNameField.value
        dogBreed.innerText = dogBreedField.value
        dogSex.innerText = dogSexField.value
        editDB(dog);
      })
    })

  })
}

const editDB = (dog) => {
  // patch to server
  dogNameField.value = ''
  dogNameField.value = ''
  dogNameField.value = ''
}
