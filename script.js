let allPokemon = [];

function init(){
    loadPokemon();
}


async function loadPokemon(){
    for (let i = 1; i < 2; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        allPokemon.push(currentPokemon);
        document.getElementById("cardcontent").innerHTML += generateCard(currentPokemon, i);
        getType(currentPokemon);
    }
}

function generateCard(currentPokemon, i){
    return `
    <div class="pokemonCard">
        <div class="pokemonCardHeader">
          <div class="pokemonName">${currentPokemon.name}</div>
          <div class="pokemonNumber"># ${currentPokemon.id}</div>
        </div>
        <div class="pokemonCardContent">
          <div class="pokemonClass" id="pokemonClass">

          </div>
          <img src="${currentPokemon.sprites.other.dream_world.front_default}" alt="BISASAM" />
        </div>
      </div>
    `;
}

function getType(currentPokemon){
    for (let j = 0; j < currentPokemon.types.length; j++) {
        document.getElementById("pokemonClass").innerHTML += `
        <div class="fightClass">${currentPokemon.types[j].type.name}</div>
        `;
        
    }
}