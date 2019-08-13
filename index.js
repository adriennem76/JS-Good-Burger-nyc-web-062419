document.addEventListener("DOMContentLoaded", () => {
  const menu = document.body.querySelector("#burger-menu")
  const order = document.body.querySelector("#order-list")
  const form = document.body.querySelector("#custom-burger")
  let menuLength = 0

  fetch ("http://localhost:3000/burgers")
  .then(response => response.json())
  .then(function(json) {
    json.forEach(drawBurger)
    menuLength = json.length
  })

  document.body.addEventListener("click", function (e){
    if (e.target.innerHTML === 'Add to Order'){
      const html = `<li>${e.target.parentElement.firstElementChild.innerHTML}</li>`
      order.insertAdjacentHTML('beforeend', html)
    }
  })

  form.addEventListener("submit", function (e){
    event.preventDefault();
    const name = e.target.name.value
    const description = e.target.description.value
    const image = e.target.url.value
    const burger = {id: menuLength+1,name: name, description: description,image: image}
    fetch ("http://localhost:3000/burgers",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(burger)
    })
    .then(response => response.json());
    order.insertAdjacentHTML('beforeend', `<li>${burger.name}</li>`)
    drawBurger(burger)
  })

  function drawBurger (burger) {
    const html = `<div class="burger">
          <h3 class="burger_title">${burger.name}</h3>
          <img src="${burger.image}">
          <p class="burger_description">
            ${burger.description}
          </p>
          <button class="button">Add to Order</button>
          </div>`
        menu.insertAdjacentHTML('beforeend', html)
  }

})


