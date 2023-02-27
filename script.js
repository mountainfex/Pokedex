let allPokemon = [];
let stats = []

function init() {
  loadPokemon();
}

async function loadPokemon() {
  for (let i = 1; i < 21; i++) {
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
  renderAboutCategory(i);
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
      <img class="arrowleft" onclick="slide(${i-1})" src="img/arrow_back.svg" alt="">
      <img class="pokemonimg" src="${bigPokemon.sprites.other.dream_world.front_default}" alt=""/>
      <img class="arrowright" onclick="slide(${i+1})" src="img/arrow_forward.svg" alt="">
    </div>
  </div>

  <div class="openPokeCardBottom">
    <div class="categoryHeader">
      <p onclick="renderAboutCategory(${i})"class="category">About</p>
      <p onclick="renderBaseStats(${i})" class="category">Base Stats</p>
      <p onclick="renderMoves(${i})"class="category">Moves</p>
    </div>
    <div class="categories" id="categories">
    </div>
  </div>
     `;
}


function renderAboutCategory(i){
  document.getElementById('categories').classList.remove('move-div');
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
    category.innerHTML = `<canvas id="myChart" width="400" height="400"></canvas>`;

    let myChart = document.getElementById("myChart");
    for (let m = 0; m < currentPokemon.stats.length; m++) {
      let apiData = currentPokemon.stats[m].base_stat;
      myChart.innerHTML = getBaseStats(apiData);
    }
}}

function getBaseStats(apiData){
  const ctx = document.getElementById('myChart');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
    labels: [
      'HP',
      'Attack',
      'Defense',
      'Special Attack',
      'Special Defense',
      'Speed',
    ],
    datasets: [{
      label: 'My First Dataset',
      data: apiData,
      backgroundColor: [
        'rgb(86, 193, 130)',
        'rgb(251, 108, 108)',
        'rgb(227, 177, 58)',
        'rgb(50, 179, 226)',
        'rgb(175, 207, 123)',
        'rgb(165, 97, 165)'
      ],
      hoverOffset: 4
    }]
  }
})
};

function renderMoves(i){
  document.getElementById('categories').classList.add('move-div');
  let currentPokemon = allPokemon[i-1];
  let movesCategory = document.getElementById("categories");
  movesCategory.innerHTML = ``;

  for (let n = 0; n < currentPokemon.moves.length; n++) {
    let newMoves = currentPokemon.moves[n];

    movesCategory.innerHTML += getMovesCategory(newMoves, n);
  }
}

function getMovesCategory(newMoves, n){
  return `
  <p class="move" id="move">${newMoves.move.name}</p>`;
}

function slide(p){
  let currentPokemon = allPokemon[p-1];
  let fightclasstype = currentPokemon.types[0].type.name;
  let slide = document.getElementById('openPokeCard');

  if (p < 0){
    p = currentPokemon.length -1;
  }

  if (p > currentPokemon.length-1){
    p=0; 
  }
    slide.innerHTML = generatePokecard(currentPokemon,fightclasstype,p);
    renderAboutCategory(p);
}


























  

