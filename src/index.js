document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById("table-body")
  const dogForm = document.getElementById('dog-form')
  
  

  const render = function() {
    fetch('http://localhost:3000/dogs')
    .then(function(response){
      return response.json()
    })
    .then (function(dogs){
      tableBody.innerHTML = ``
      dogs.forEach(function(dog, indexOfDog){
        const dogRow = tableBody.appendChild(document.createElement('tr'))
        dogRow.id = dog.id
        const dogName = dogRow.appendChild(document.createElement('td'))
        const dogBreed = dogRow.appendChild(document.createElement('td'))
        const dogSex = dogRow.appendChild(document.createElement('td'))
        const dogEditButton = dogRow.appendChild(document.createElement('button'))
        dogName.innerHTML = `${dog.name}`
        dogBreed.innerHTML = `${dog.breed}`
        dogSex.innerHTML = `${dog.sex}`
        dogEditButton.innerHTML = `Edit Dog`
        dogEditButton.addEventListener('click', function(event){
          dogForm.name.value = dog.name
          dogForm.breed.value = dog.breed
          dogForm.sex.value = dog.sex
          dogForm.dogId.value = dog.id
        })
      })
    })
  } 

  const submitDog = function() {
    fetch(`http://localhost:3000/dogs/${dogForm.dogId.value}`, {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        name: dogForm.name.value,
        breed: dogForm.breed.value,
        sex: dogForm.sex.value
      })
    }).then (render)
  }
  dogForm.addEventListener('submit', function(event) {
    event.preventDefault()
    submitDog()
  })
  render()

})

