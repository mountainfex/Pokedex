let allPokemon = [];

function init(){
    loadPokemon();
}



async function loadPokemon(){
    
    for (let i = 1; i < 21; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        let fightclasstype = currentPokemon.types[0].type.name;
        allPokemon.push(currentPokemon);
        document.getElementById("cardContent").innerHTML += generateCard(fightclasstype, currentPokemon, i);
        getType(currentPokemon,i);
    }
    
}

function generateCard(fightclasstype, currentPokemon,i){
    return `
    <div class="pokemonCard ${fightclasstype}" onclick="openPokeCard()">
        <div class="pokemonCardHeader">
          <div class="pokemonName">${currentPokemon.name}</div>
          <div class="pokemonNumber"># ${currentPokemon.id}</div>
        </div>
        <div class="pokemonCardContent">
          <div class="pokemonClass" id="pokemonClass${i}">

          </div>
          <img class="pokemonIMG"src="${currentPokemon.sprites.other.dream_world.front_default}" alt="" />
        </div>
      </div>
    `;
}

function getType(currentPokemon,i){
    for (let j = 0; j < currentPokemon.types.length; j++) {
        let pokemonClassID = document.getElementById(`pokemonClass${i}`);
        pokemonClassID.innerHTML+=`
        <div class="fightClass">${currentPokemon.types[j].type.name}</div>
        `;        
    }
}
function openPokeCard(){
    document.getElementById("popUpContainer").classList.remove('dnone');
}

function closePokeCard(){
    document.getElementById("popUpContainer").classList.add('dnone');
}


