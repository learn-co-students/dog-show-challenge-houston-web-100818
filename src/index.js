const tableBody = document.querySelector('#table-body')
const ce = document.createElement.bind(document)


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
    console.log(dog)
    const dogRow = ce('tr')
    const dogName = ce('td')
    dogName.innerHTML = dog.name
    const dogBreed = ce('td')
    dogBreed.innerHTML = dog.breed
    const dogSex = ce('td')
    dogSex.innerHTML = dog.sex
    const dogButton = ce('td')
    const button = ce('button')
    button.innerHTML = 'Edit Dog'
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
    dogButton.append(button)
  })
};

render()
