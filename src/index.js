const qs = document.querySelector.bind(document)
const ce = document.createElement.bind(document)
const tableBody = qs('#table-body')
const formName = qs('.name-field')
const formBreed = qs('[type="breed"]')
const formSex = qs('[type="sex"]')
const formSubmit = qs('[type="submit"]')

// Data
let selectedDog;

const render = function(){

  fetch('http://localhost:3000/dogs')
    .then(function(response){
      return response.json()
    })
    .then(function(dogs){
      renderDogs(dogs)
    })
}

const renderDogs = function(dogs){
  tableBody.innerHTML = ''
  dogs.forEach(function(dog){
    const dogRow = ce('tr')
    const dogName = ce('td')
    dogName.innerHTML = dog.name
    const dogBreed = ce('td')
    dogBreed.innerHTML = dog.breed
    const dogSex = ce('td')
    dogSex.innerHTML = dog.sex
    const dogButton = ce('td')
    const editButton = ce('button')
    editButton.innerHTML = 'Edit Dog'
    editButton.id = dog.id
    editButton.addEventListener('click',function(e){
      selectedDog = dog
      renderDogForm()
    })

    tableBody.append(dogRow)
    dogRow.append(dogName)
    dogRow.append(dogBreed)
    dogRow.append(dogSex)
    dogRow.append(dogButton)
    dogButton.append(editButton)
  })
};

const renderDogForm = function(){
  formName.value = selectedDog.name
  formBreed.value = selectedDog.breed
  formSex.value = selectedDog.sex

}

formSubmit.addEventListener('click', function(e){
  e.preventDefault()
  updateDog()
  formName.value = ''
  formBreed.value = ''
  formSex.value = ''
})

const updateDog = function(){
  fetch(`http://localhost:3000/dogs/${selectedDog.id}` , {
    method: 'PATCH',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      name: formName.value,
      breed: formBreed.value,
      sex: formSex.value
    })
  })
    .then(render)
}

render()
