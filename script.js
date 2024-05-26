const BASE_URL = 'https://pokeapi.co/api/v2/';
let url = 'https://pokeapi.co/api/v2/pokemon?limit=30&offset=0';
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

// Funktion, die die Pokémon-Namen lädt und anzeigt
async function loadingPokemonNames() {
    let pokemonCards = document.getElementById('main-content');
    pokemonCards.innerHTML = '';

    if (loadedPokemons.length > 0) {
        for (let i = 0; i < loadedPokemons.length; i++) {
            let pokemonName = loadedPokemons[i].name;
            let pokemonUrl = loadedPokemons[i].url;

            // Daten aus dem bereits geladenen JSON verwenden
            let pokemonDetails = await getPokemonDetails(pokemonUrl);
            let pokemonAbilities = pokemonDetails.abilities.map(ability => ability.ability.name).join(', ');

            pokemonCards.innerHTML += `
                <div class="pokemon-card">
                    <h3>${pokemonName}</h3>
                    <p>Abilitys: ${pokemonAbilities}</p>
                    <a href="${pokemonUrl}">Additional Information</a>
                </div>
            `;
        }
    }

    console.log(loadedPokemons);
}

// Funktion, die die Pokémon-Details aus der URL holt
async function getPokemonDetails(url) {
    let response = await fetch(url);
    let pokemonDetails = await response.json();
    return pokemonDetails;
}
