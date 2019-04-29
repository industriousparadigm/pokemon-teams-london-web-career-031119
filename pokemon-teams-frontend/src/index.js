const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const mainDiv = document.querySelector('main')


// function to fetch a trainer from the server
const fetchTrainers = function() {
  return fetch(TRAINERS_URL)
    .then(resp => resp.json())
}

const renderTrainers = function(trainers) {
  trainers.forEach(renderTrainer)
}

// function to add a trainer card to the page
const renderTrainer = function(trainer) {
  const trainerCard = document.createElement('div')
  trainerCard.className = "card"
  trainerCard.setAttribute(`data-id`, `${trainer.id}`)

  const trainerName = document.createElement('p')
  trainerName.innerText = trainer.name
  trainerCard.appendChild(trainerName)

  const addPokemonBtn = document.createElement('button')
  addPokemonBtn.setAttribute(`data-trainer-id`, `${trainer.id}`)
  addPokemonBtn.innerText = "Add Pokemon"
  trainerCard.appendChild(addPokemonBtn)

  const pokemonList = document.createElement('ul')
  trainerCard.appendChild(pokemonList)

  const renderPokemon = function(pokemon) {
    if (pokemonList.childElementCount < 6) {
      const pokemonLi = document.createElement('li')
      pokemonLi.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release`
  
      const releaseBtn = pokemonLi.querySelector('.release')
      releaseBtn.addEventListener('click', () => {
        fetch(POKEMONS_URL + `/${pokemon.id}`, {
          method: 'DELETE'
        })
        pokemonLi.remove()
      })
  
      pokemonList.appendChild(pokemonLi)
  
    } else {
      alert(`${trainer.name}'s team is full.`)
    }
  }

  trainer.pokemons.forEach(renderPokemon)

  addPokemonBtn.addEventListener('click', () => {
    fetch(POKEMONS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "trainer_id": trainer.id })
    })
      .then(response => response.json())
      .then(renderPokemon)

  })

  mainDiv.appendChild(trainerCard)

}



fetchTrainers().then(renderTrainers)




