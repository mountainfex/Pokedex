let allPokemon = [];
let startID = 1;
let endID = 21;
let data = [];
let names = [];

function init() {
  loadPokemon();
}

async function loadPokemon() {
  document.getElementById('loader').classList.remove('hideloader');
  for (let i = startID; i < endID; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let currentPokemon = await response.json();
    allPokemon.push(currentPokemon);
    showPokemon(currentPokemon,i)
  }
  document.getElementById('loader').classList.add('hideloader');
}

function showPokemon(currentPokemon,i){
  let id = currentPokemon.id;
  let name = currentPokemon.name;
  let imgURl = currentPokemon.sprites.other.dream_world.front_default
  let fightclasstype = currentPokemon.types[0].type.name;
  document.getElementById("cardContent").innerHTML += generateCard(fightclasstype, id, name, imgURl,i);
  getType(currentPokemon, i, `pokemonClass${i}`);
}

function generateCard(fightclasstype, id, name, imgURl,i) {
  return `
    <div class="pokemonCard ${fightclasstype}" onclick="openPokeCard(${i})">
        <div class="pokemonCardHeader">
          <div class="pokemonName">${name}</div>
          <div class="pokemonNumber"># ${id}</div>
        </div>
        <div class="pokemonCardContent">
          <div class="pokemonClass" id="pokemonClass${i}">

          </div>
          <img class="pokemonIMG"src="${imgURl}" alt="" />
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
        <div class="openPokemonHeadcontent">
          <div class="openPokemonName">${bigPokemon.name}
          </div>
          <div class="openPokemonNumber"># ${bigPokemon.id}
          </div>
        </div>
      <div class="openPokemonHeadIMG"> 
        <img class="closebutton" onclick="closePokeCard()" src="img/close.png" alt="">
      </div>
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

function getAboutCategory(currentPokemon,){
  return `
  <div class="categoryAbout">
    <div class="attribute">
      <p>Height:
      </p>
      <p>${(currentPokemon.height / 10).toFixed(1).replaceAll(".", ",")} m
      </p>
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
      <p>Base Experience
      </p>
      <p>${currentPokemon.base_experience}
      </p>
    </div>
    <hr class="line" />
  </div>
  `;
}



async function renderBaseStats (i){ {
    document.getElementById('categories').classList.remove('move-div');
    let currentPokemon = allPokemon[i-1];
    let category = document.getElementById("categories");
    category.innerHTML = ``;
    category.innerHTML = `<canvas class="myChart" id="myChart"></canvas>`;

    names = [];
    data = [];
    for (let q = 0; q < currentPokemon.stats.length; q++) {
      let name = currentPokemon.stats[q].stat.name;
      let stats = currentPokemon.stats[q].base_stat;
      names.push(name);
      data.push(stats);
    }

    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
    type: 'doughnut',
    data: {
    labels: names,
    datasets: [{
      label: 'Basestats',
      data: data,
      backgroundColor: [
        'rgb(86, 193, 130)',
        'rgb(251, 108, 108)',
        'rgb(227, 177, 58)',
        'rgb(50, 179, 226)',
        'rgb(175, 207, 123)',
        'rgb(165, 97, 165)',
      ],
      hoverOffset: 4
    }]
  }
})
}}

function renderMoves(i){
  document.getElementById('categories').classList.add('move-div');
  let currentPokemon = allPokemon[i-1];
  let movesCategory = document.getElementById("categories");
  movesCategory.innerHTML = `
  <div class="moveArrowDown"> <img src="img/keyboard_double_arrow_down_FILL0_wght100_GRAD0_opsz40.svg" alt=""> </div>`;

  for (let n = 0; n < currentPokemon.moves.length; n++) {
    let newMoves = currentPokemon.moves[n];

    movesCategory.innerHTML += getMovesCategory(newMoves, n);
  }
}

function getMovesCategory(newMoves){
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
    getType(currentPokemon, p,`pokemonCardClass`);
    renderAboutCategory(p);
}

function searchPokemon(){
  let search = document.getElementById("search").value;
  search = search.toLowerCase();
  let content = document.getElementById('cardContent');
  content.innerHTML='';
  for (let s = 0; s < allPokemon.length; s++) {
    pokemon = allPokemon[s];
    if(pokemon.name.includes(search))
    showPokemon(pokemon,s);
  }
}

async function loadNewPokemon() {
  let content = document.getElementById('cardContent');
  if (content.offsetHeight + content.scrollTop >= content.scrollHeight) {
      content.classList.add('stopScroll');
      startID = endID;
      endID = endID + 20;
      await loadPokemon();
      content.classList.remove('stopScroll');
  }
}

























  

