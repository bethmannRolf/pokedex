const BASE_URL = 'https://pokeapi.co/api/v2/';
let url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
let ditto = 'https://pokeapi.co/api/v2/pokemon/ditto'; // Test

let loadedPokemons = [];
let DETAIL_VIEW_OPEN = false;
let pokemonJSON = [];

// Funktion, die zusätzliche Funktionen beim Laden der Seite ausführt
async function additionalFunctionsonload() {
    await initContext();
    loadingPokemonNames();
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
async function loadingPokemonNames() {
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
            <div id="smallcard${i}" class="whole-pokemon-card ${firstType}">
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
                        <img class="pokemon-image-small-card" src="${pokemonImage}">
                    </div>
                </div>
            </div>
            `;
        }
    }

    console.log(loadedPokemons);
}

async function getPokemonDetails(url) {
    let response = await fetch(url);
    let pokemonDetails = await response.json();
    return pokemonDetails;
}

async function renderLargeCards() {
    // Hier kannst du deinen Code für große Karten hinzufügen
}


