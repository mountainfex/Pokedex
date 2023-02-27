let allPokemon = [];

function init() {
  loadPokemon();
}

async function loadPokemon() {
  for (let i = 1; i < 3; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let currentPokemon = await response.json();
    let fightclasstype = currentPokemon.types[0].type.name;
    allPokemon.push(currentPokemon);
    document.getElementById("cardContent").innerHTML += generateCard(
      fightclasstype,
      currentPokemon,
      i
    );
    getType(currentPokemon, i, `pokemonClass${i}`);
  }
}

function generateCard(fightclasstype, currentPokemon, i) {
  return `
    <div class="pokemonCard ${fightclasstype}" onclick="openPokeCard(${i})">
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

function getType(currentPokemon, i, ID) {
  for (let j = 0; j < currentPokemon.types.length; j++) {
    let pokemonClassID = document.getElementById(ID);
    pokemonClassID.innerHTML += `
        <div class="fightClass">${currentPokemon.types[j].type.name}</div>
        `;
  }
}


// Rendering the popUpCart
function openPokeCard(i) {
  document.getElementById("popUpContainer").classList.remove("dnone");
  let pokecard = document.getElementById("openPokeCard");
  let bigPokemon = allPokemon[i - 1];
  let fightclasstype = bigPokemon.types[0].type.name;
  pokecard.innerHTML = generatePokecard(bigPokemon, fightclasstype, i);
  getType(bigPokemon, i, "pokemonCardClass");
  prepareAboutCategory(i);
  renderAbilities(bigPokemon);
}

function closePokeCard() {
  document.getElementById("popUpContainer").classList.add("dnone");
}

function doNotClose(event) {
  event.stopPropagation();
}

function renderAbilities(bigPokemon) {
  let abilities = document.getElementById("abilities");
  abilities.innerHTML = "";
  for (let l = 0; l < bigPokemon.abilities.length; l++) {
    let newAbility = bigPokemon.abilities[l];

    if (l < bigPokemon["abilities"].length - 1) {
      abilities.innerHTML += createAbilities(newAbility);
    } else {
      abilities.innerHTML += createAbilitiesWithoutComma(newAbility);
    }
  }
}

function createAbilities(newAbility) {
  return `${newAbility.ability.name}, `;
}

function createAbilitiesWithoutComma(newAbility) {
  return `${newAbility.ability.name}`;
}

function generatePokecard(bigPokemon, fightclasstype, i) {
  return `
    <div class="openPokeCardTop ${fightclasstype}">
    <div class="openPokemonCardHeader">
      <div class="openPokemonName">${bigPokemon.name}</div>
      <div class="openPokemonNumber"># ${bigPokemon.id}</div>
    </div>
    <div class="openPokemonClass" id="pokemonCardClass">

    </div>
    <div class="openPokemonCardIMG">
      <img src="${bigPokemon.sprites.other.dream_world.front_default}" alt=""/>
    </div>
  </div>

  <div class="openPokeCardBottom">
    <div class="categoryHeader">
      <p onclick="prepareAboutCategory(${i})"class="category">About</p>
      <p onclick="renderBaseStats(${i})" class="category">Base Stats</p>
      <p onclick="prepareMoves(${i})"class="category">Moves</p>
    </div>
    <div class="categories" id="categories">

    </div>
  </div>
     `;
}


function prepareAboutCategory(i){
  let currentPokemon = allPokemon[i-1];
  let categoryAbout = document.getElementById("categories");
  categoryAbout.innerHTML = ``;
  categoryAbout.innerHTML = getAboutCategory(currentPokemon, i);
  renderAbilities(currentPokemon);
}

function getAboutCategory(currentPokemon,i){
  return `<div class="categoryAbout">
  <div class="attribute">
    <p>Height:</p>
    <p>${(currentPokemon.height / 10).toFixed(1).replaceAll(".", ",")} m</p>
  </div>
  <hr class="line" />
  <div class="attribute">
    <p>Weight:</p>
    <p>${(currentPokemon.weight / 10).toFixed(1).replaceAll(".", ",")} kg</p>
  </div>
  <hr class="line" />
  <div class="attribute">
    <p>Abilities:</p>
    <p id="abilities"></p>
  </div>
  <hr class="line" />
  <div class="attribute">
    <p>Base Experience</p>
    <p>${currentPokemon.base_experience}</p>
  </div>
  <hr class="line" />
</div>`;
}


function renderBaseStats (i){ {
    let currentPokemon = allPokemon[i-1];
    let category = document.getElementById("categories");
    category.innerHTML = ``;
    for (let m = 0; m < currentPokemon.stats.length; m++) {
      let newStat = currentPokemon.stats[m];
      category.innerHTML += getBaseStats(newStat);
      
    }
    
}}

function getBaseStats(newStat){
  return `
  <div class="stats">
    <div class="progress" role="progressbar" aria-label="Example with label">
      <div class="progress-bar bg-success progressbarcontent">${newStat.stat.name}</div>
    </div>
  </div>`;
}
  

// function prepareMoves(i){
//   let currentPokemon = allPokemon[i];
//   let movesCategory = document.getElementById("categories");
//   movesCategory.innerHTML = ``;
//   movesCategory.innerHTML = getMovesCategory(currentPokemon, i);
// }

// function getMovesCategory(currentPokemon, i){
//   return ``;
// }