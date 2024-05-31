const BASE_URL = 'https://pokeapi.co/api/v2/';
let url = 'https://pokeapi.co/api/v2/pokemon?limit=15&offset=0';

let loadedPokemons = [];
let DETAIL_VIEW_OPEN = false;
let pokemonJSON = [];
let offset = 0;
// Funktion, die zusätzliche Funktionen beim Laden der Seite ausführt
async function additionalFunctionsonload() {
    await initContext();
    loadSmallPokemonCards();
}

// Funktion, die den Initialisierungskontext lädt
async function initContext() {
    let response = await fetch(url);
    let responseAsJSON = await response.json();
    loadedPokemons = responseAsJSON.results;
}

function capitalizeFirstLetter(pokemonName) {
    return pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
}

// Funktion, die die Pokémon-Namen lädt und anzeigt
async function loadSmallPokemonCards() {
    let pokemonCards = document.getElementById('main-content');
    pokemonCards.innerHTML = '';

    if (loadedPokemons.length > 0) {
        for (let i = 0; i < loadedPokemons.length; i++) {
            let pokemonName = loadedPokemons[i].name;
            pokemonName = capitalizeFirstLetter(pokemonName);
            let pokemonUrl = loadedPokemons[i].url;

            // Daten aus dem bereits geladenen JSON verwenden
            let pokemonDetails = await getPokemonDetails(pokemonUrl);

            let pokemonTypes = pokemonDetails.types.map(typeInfo => typeInfo.type.name);
            let firstType = pokemonTypes[0];  // Der erste Typ des Pokémon

            let pokemonHeight = pokemonDetails.height;
            let pokeID = pokemonDetails.id;
            let pokemonImage = pokemonDetails.sprites.front_default;

            console.log("Pokedetails", pokemonDetails);

            pokemonCards.innerHTML += `
            <div onclick="showLargeCard(${i})" id="smallcard${i}" class="whole-pokemon-card ${firstType}">
                <div class="upper-div-small-card">
                    <div class="pokemon-name-small-card">
                        <span class="pokemon-name-small-card-span">${pokemonName}</span>
                    </div>
                    <div class="pokemon-id-small-card">
                        <span class="pokeID-small-card-span">Poke-ID: ${pokeID} </span>
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

async function showLargeCard(i) {
    openLargeCardOverlay()
    let pokemonName = loadedPokemons[i].name;
    pokemonName = capitalizeFirstLetter(pokemonName);
    let pokemonUrl = loadedPokemons[i].url;
    let pokemonDetails = await getPokemonDetails(pokemonUrl);
    let pokemonHeight = pokemonDetails.height;
    let pokemonTypes = pokemonDetails.types.map(typeInfo => typeInfo.type.name);
    let firstType = pokemonTypes[0];  // Der erste Typ des Pokémon
    console.log("First type large card", firstType)
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
            <span class="pokemon-name-large-card-styling">${pokemonName}</span>
        </div>
        <div class="type-div-large-card">
            <span class="id-span-large-card">Poke-ID: ${pokeID}</span>
            <span class="type-span-large-card">Type: ${pokemonTypes.join(', ')}</span>
            <span class="height-span large card">Height: ${pokemonHeight * 10} cm  </span>
        </div>
        <div class="image-div-large-card">
            <img onclick="showPreviousCard(${i})" class="backwards-button-styling" src="/img/arrow_back.svg">
            <img class="image-large-card" src="${pokemonImage}">
            <img onclick="showNextCard(${i})" class="forward-button-styling" src="/img/arrow_forward.svg">
        </div>
        <div class="lower-section-large-card">
            <div class="lower-large-card-flex-container">
                <div class="about-div-large-card"> 
                    <span id="about-large-card-id" onclick="renderAboutSection()" class="about-span-styling">About</span>
                </div>    
                <div>
                    <span id="status-large-card-id" onclick="renderBaseStats()" class="stats-span-styling">Stats</span>
                </div>
            </div>
            <div id="lower-information-large-card">  
             
            </div>
        </div>
    </div>
    `
}

async function showPreviousCard(i) {
    if (i > 0) {
        await showLargeCard(i - 1);
    }
}

async function showNextCard(i) {
    if (i < loadedPokemons.length - 1) {
        await showLargeCard(i + 1);
    }
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
        <div>
            <span class="about-category-span">Weight</span>
            <span class="about-value-span"></span>
        </div>
        <div>
            <span class="about-category-span">Height</span>
            <span class="about-value-span"></span>
        </div>
        <div>
            <span class="about-category-span">Base Experience</span>
            <span class="about-value-span"></span>
        </div>
        <div>
            <span class="about-category-span">Abillities</span>
            <span class="about-value-span"></span>
        </div>
    </div>
`
}

function renderBaseStats() {
    document.getElementById('about-large-card-id').classList.remove('bold-underline')
    document.getElementById('status-large-card-id').classList.add('bold-underline')
    let baseStatsSection = document.getElementById('lower-information-large-card')
    baseStatsSection.innerHTML = '';
    baseStatsSection.innerHTML = `
<div>
<span>Willkommen in den Stats</span>
<div>
`

}

