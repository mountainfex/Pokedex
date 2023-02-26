let allPokemon = [];

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
  pokecard.innerHTML = generatePokecard(bigPokemon, fightclasstype);
  getType(bigPokemon, i, "pokemonCardClass");
  renderAbilities(bigPokemon);
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

function closePokeCard() {
  document.getElementById("popUpContainer").classList.add("dnone");
}

function doNotClose(event) {
  event.stopPropagation();
}

function generatePokecard(bigPokemon, fightclasstype) {
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
      <p>About</p>
      <p>Base Stats</p>
      <p>Moves</p>
    </div>
    <div class="categories">
      <div class="categoryAbout">
        <div class="attribute">
          <p>Height:</p>
          <p>${(bigPokemon.height / 10).toFixed(1).replaceAll(".", ",")} m</p>
        </div>
        <hr class="line" />
        <div class="attribute">
          <p>Weight:</p>
          <p>${(bigPokemon.weight / 10).toFixed(1).replaceAll(".", ",")} kg</p>
        </div>
        <hr class="line" />
        <div class="attribute">
          <p>Abilities:</p>
          <p id=abilities></p>
        </div>
        <hr class="line" />
        <div class="attribute">
          <p>Base Experience</p>
          <p>${bigPokemon.base_experience}</p>
        </div>
        <hr class="line" />
      </div>
      <div class="categoryStats"></div>
      <div class="categoryMoves"></div>
    </div>
  </div>
     `;
}
