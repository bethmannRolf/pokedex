const BASE_URL = 'https://pokeapi.co/api/v2/';
let url = 'https://pokeapi.co/api/v2/pokemon?limit=15&offset=0';

let loadedPokemons = [];
let DETAIL_VIEW_OPEN = false;
let offset = 0;  // Initialer Offset-Wert
let filteredPokemons = [];  // Für gefilterte Pokémon

async function additionalFunctionsonload() {
    await initContext();
    loadSmallPokemonCards();
}

async function initContext() {
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    loadedPokemons = loadedPokemons.concat(responseAsJSON.results); // Pokémon zur bestehenden Liste hinzufügen
}

function capitalizeFirstLetter(pokemonName) {
    return pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
}

async function loadSmallPokemonCards(pokemons = loadedPokemons) {
    let pokemonCards = document.getElementById('main-content');
    pokemonCards.innerHTML = '';  // Nur einmal leeren, wenn die Seite neu geladen wird

    if (pokemons.length > 0) {
        for (let i = 0; i < pokemons.length; i++) {
            let pokemonName = pokemons[i].name;
            pokemonName = capitalizeFirstLetter(pokemonName);
            let pokemonUrl = pokemons[i].url;

            let pokemonDetails = await getPokemonDetails(pokemonUrl);
            console.log("Details", pokemonDetails)
            let pokemonTypes = pokemonDetails.types.map(typeInfo => typeInfo.type.name);
            let firstType = pokemonTypes[0];

            let pokemonHeight = pokemonDetails.height;
            let pokeID = pokemonDetails.id;
            let pokemonImage = pokemonDetails.sprites.front_default;

            pokemonCards.innerHTML += `
            <div onclick="showLargeCard('${pokemonName}')" id="smallcard${i}" class="whole-pokemon-card ${firstType}">
                <div class="upper-div-small-card">
                    <div class="pokemon-name-small-card">
                        <span class="pokemon-name-small-card-span">${pokemonName}</span>
                    </div>
                    <div class="pokemon-id-small-card">
                        <span class="pokeID-small-card-span">Poke-ID: ${pokeID}</span>
                    </div>
                </div>
                <div class="lower-div-small-card">
                    <div class="lower-small-card-left">
                        <div class="lower-left-small-height-div">
                            <span class="lower-left-small-height">Height: ${pokemonHeight * 10} cm  </span>
                        </div>
                        <div class="type-div-smallcard-styling" id="type-div-small-card">
                            <span class="pokemon-type-small-card">Type: ${pokemonTypes.join(', ')}</span>
                        </div>
                    </div>
                    <div class="lower-small-card-right">
                        <img class="pokemon-image-small-card" id="pokemon-image-small-card-for-hover${i}" src="${pokemonImage}">
                    </div>
                </div>
            </div>
            `;
        }
    }
}

async function getPokemonDetails(url) {
    let response = await fetch(url);
    let pokemonDetails = await response.json();
    return pokemonDetails;
}

async function showLargeCard(pokemonName) {
    openLargeCardOverlay();

    let pokemon = filteredPokemons.length > 0
        ? filteredPokemons.find(p => p.name.toLowerCase() === pokemonName.toLowerCase())
        : loadedPokemons.find(p => p.name.toLowerCase() === pokemonName.toLowerCase());
    if (!pokemon) return;

    let pokemonUrl = pokemon.url;
    let pokemonDetails = await getPokemonDetails(pokemonUrl);
    let pokemonHeight = pokemonDetails.height;
    let pokemonTypes = pokemonDetails.types.map(typeInfo => typeInfo.type.name);
    let firstType = pokemonTypes[0];
    let pokeID = pokemonDetails.id;
    let pokemonImage = pokemonDetails.sprites.front_default;

    let singleLargeCard = document.getElementById('detailview-single-card');
    singleLargeCard.innerHTML = '';

    singleLargeCard.innerHTML = `
    <div class="single-large-card-styling ${firstType}">
        <div class="close-section-large-card">
            <img onclick="closeLargeCard()" class="close-button-large-card-styling" id="close-button-large-card" src="/img/close.svg">
        </div>
        <div class="pokemon-name-large-card-div">
            <span class="pokemon-name-large-card-styling">${capitalizeFirstLetter(pokemonName)}</span>
        </div>
        <div class="type-div-large-card">
            <span class="id-span-large-card">Poke-ID: ${pokeID}</span>
            <span class="type-span-large-card">Type: ${pokemonTypes.join(', ')}</span>
            <span class="height-span large card">Height: ${pokemonHeight * 10} cm  </span>
        </div>
        <div class="image-div-large-card">
            <img onclick="showPreviousCard('${pokemonName}')" class="backwards-button-styling" src="/img/arrow_back.svg">
            <img class="image-large-card" src="${pokemonImage}">
            <img onclick="showNextCard('${pokemonName}')" class="forward-button-styling" src="/img/arrow_forward.svg">
        </div>
        <div class="lower-section-large-card">
            <div class="lower-large-card-flex-container">
                <div class="about-div-large-card"> 
                    <span id="about-large-card-id" onclick="renderAboutSection('${pokemonName}')" class="about-span-styling">About</span>
                </div>    
                <div>
                    <span id="status-large-card-id" onclick="renderBaseStats('${pokemonName}')" class="stats-span-styling">Stats</span>
                </div>
            </div>
            <div id="lower-information-large-card">  
             
            </div>
        </div>
    </div>
    `;
}

function openLargeCardOverlay() {
    if (DETAIL_VIEW_OPEN == false) {
        document.getElementById('detailview-single-card').classList.remove('d-none');
        document.getElementById('dark-overlay').classList.add('dark-overlay-styling');
    }
    DETAIL_VIEW_OPEN = true;
}

function closeLargeCard() {
    if (DETAIL_VIEW_OPEN == true) {
        removeDarkOverlay()
        document.getElementById('detailview-single-card').classList.add('d-none')
    }
    DETAIL_VIEW_OPEN = false;
}

function removeDarkOverlay() {
    document.getElementById('dark-overlay').classList.remove('dark-overlay-styling')
}

function renderAboutSection() {
    
    document.getElementById('status-large-card-id').classList.remove('bold-underline')
    document.getElementById('about-large-card-id').classList.add('bold-underline')
    let aboutSection = document.getElementById('lower-information-large-card')

    aboutSection.innerHTML = '';
    aboutSection.innerHTML = `
    <div class="rendered-about-section">
        <div class="about-category-div">
            <span class="about-category-span">Weight:</span>
            <span class="about-value-span"></span>
        </div>
        <div class="about-category-div">
            <span class="about-category-span">Poke-ID:</span>
            <span class="about-value-span"></span>
        </div>
        <div class="about-category-div">
            <span class="about-category-span">Type:</span>
            <span class="about-value-span"></span>
        </div>
        <div class="about-category-div">
            <span class="about-category-span">Height:</span>
            <span class="about-value-span"></span>
        </div>
        <div class="about-category-div">
            <span class="about-category-span">Base Experience:</span>
            <span class="about-value-span"></span>
        </div>
        <div class="about-category-div">
            <span class="about-category-span">Abilities:</span>
            <span class="about-value-span"></span>
        </div>
    </div>
`
}

async function renderBaseStats(pokemonName) {
  
    document.getElementById('about-large-card-id').classList.remove('bold-underline')
    document.getElementById('status-large-card-id').classList.add('bold-underline')
    let baseStatsSection = document.getElementById('lower-information-large-card')
    baseStatsSection.innerHTML = '';
    baseStatsSection.innerHTML = `
    <div>
    <canvas id="myChart"></canvas>
    </div>
    `;
    let pokemon = filteredPokemons.length > 0
        ? filteredPokemons.find(p => p.name.toLowerCase() === pokemonName.toLowerCase())
        : loadedPokemons.find(p => p.name.toLowerCase() === pokemonName.toLowerCase());
    if (!pokemon) return;

    let pokemonDetails = await getPokemonDetails(pokemon.url);
    let abilities = pokemonDetails.stats.map(stat => stat.base_stat);
    console.log("abilities",  abilities)

    let hp = abilities[0];
    let attack = abilities[1];
    let defense = abilities[2];
    let attackSp = abilities[3];
    let defenseSp = abilities[4];
    let speed = abilities[5];

    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'],
            datasets: [{
                label: 'Abillity',
                data: [hp, attack, defense, attackSp, defenseSp, speed],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    min: 0,
                    max: 150,
                    ticks: {
                        stepSize: 10
                    }
                }
            }
        }
    });
}

async function loadMorePokemon() {
    offset += 15;
    url = `https://pokeapi.co/api/v2/pokemon?limit=15&offset=${offset}`;
    await initContext();
    loadSmallPokemonCards();
}

function searchPokemonList() {
    let input = document.getElementById('input-search-field').value.toLowerCase();
    filteredPokemons = loadedPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(input));
    loadSmallPokemonCards(filteredPokemons);
}

async function showPreviousCard(pokemonName) {
    let pokemons = filteredPokemons.length > 0 ? filteredPokemons : loadedPokemons;
    let index = pokemons.findIndex(p => p.name.toLowerCase() === pokemonName.toLowerCase());
    if (index > 0) {
        await showLargeCard(pokemons[index - 1].name);
    }
}

async function showNextCard(pokemonName) {
    let pokemons = filteredPokemons.length > 0 ? filteredPokemons : loadedPokemons;
    let index = pokemons.findIndex(p => p.name.toLowerCase() === pokemonName.toLowerCase());
    if (index < pokemons.length - 1) {
        await showLargeCard(pokemons[index + 1].name);
    }
}
