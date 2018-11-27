const qs = document.querySelector.bind(document)
const ce = document.createElement.bind(document)
const tableBody = document.querySelector('#table-body')
const formName = document.querySelector('[type="name"]')
const formBreed = document.querySelector('[type="breed"]')
const formSex = document.querySelector('[type="sex"]')
const formSubmit = document.querySelector('[type="submit"]')
// const editButton = ce('button')

const render = function(){

  fetch('http://localhost:3000/dogs')
    .then(function(response){
      return response.json()
    })
    .then(function(dogs){
      console.log(dogs)
      renderDogs(dogs)
    })
}

const renderDogs = function(dogs){
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
      renderDogForm(dog)
    })
    // dogRow.innerHTML = `
    //   <td></td>
    //   <td></td>
    //   <td></td>
    //   <td></td>
    // `
    tableBody.append(dogRow)
    dogRow.append(dogName)
    dogRow.append(dogBreed)
    dogRow.append(dogSex)
    dogRow.append(dogButton)
    dogButton.append(editButton)
  })
};

const renderDogForm = function(dog){
  formName.value = dog.name
  formBreed.value = dog.breed
  formSex.value = dog.sex
  formSubmit.addEventListener('click', function(e){
    updateDog(dog)
    formName.value = ''
    formBreed.value = ''
    formSex.value = ''
  })
}

const updateDog = function(dog){
  fetch(`http://localhost:3000/dogs/${dog.id}` , {
    method: 'PATCH',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      name: document.querySelector('.name-field').value,
      breed: document.querySelector('.breed-field').value,
      sex: document.querySelector('.sex-field').value
    })
  })
    .then(render)
}

render()
